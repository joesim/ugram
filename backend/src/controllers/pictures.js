import { PictureModel } from '../models/picture';
import { UserModel } from '../models/user';
import { parseEntry } from '../services';
import { UploadServices } from '../services';
import { errorMessage } from "./errorMessageHelper";

const readAll = (req, res) => {
	const limit = parseInt(req.query.perPage) || 10;
	const offset = parseInt(req.query.page) * limit;

	PictureModel.count({}).then(function(count) {
		const totalEntries = count;
		const totalPages = totalEntries == 0 ? 0 : parseInt((totalEntries - 1) / limit) + 1;

		PictureModel.find({}).sort({createdDate: 1}).limit(limit).skip(offset).then(function(rawData) {
			const data = {};
			data.totalEntries = totalEntries;
			data.totalPages = totalPages;
			data.items = rawData.map((data) => {
				let jsonData = data.toJSON();
				jsonData.id = jsonData._id;
				delete jsonData._id;
				delete jsonData.__v;
				return jsonData;
			});
			res.json(data);
		}, function(err) {
			console.log(err);
			errorMessage(res, 500, "Internal server error");
		}).catch(function(err) {
			console.log(err);
			errorMessage(res, 500, "Internal server error");
		});
	}, function(err) {
		console.log(err);
		errorMessage(res, 500, "Internal server error");
	}).catch(function(err) {
		console.log(err);
		errorMessage(res, 500, "Internal server error");
	});
};

const readAllOfUser = (req, res) => {
	const limit = parseInt(req.query.perPage) || 10;
	const offset = parseInt(req.query.page) * limit;

	// Just to check for error with user
	UserModel.findOne({id: req.params.userId}).then(function(data) {
	}, function(err) {
		console.log(err);
		errorMessage(res, 400, "Missing parameter or unexisting user");
	}).catch(function(err) {
		console.log(err);
		errorMessage(res, 500, "Internal server error");
	});

	PictureModel.count({userId: req.params.userId}).then(function(count) {
		const totalEntries = count;
		const totalPages = totalEntries == 0 ? 0 : parseInt((totalEntries - 1) / limit) + 1;

		PictureModel.find({userId: req.params.userId}).sort({createdDate: 1}).limit(limit).skip(offset).then(function(rawData) {
			const data = {};
			data.totalEntries = totalEntries;
			data.totalPages = totalPages;
			data.items = rawData.map(parseEntry);
			res.json(data);
		}, function(err) {
			console.log(err);
			errorMessage(res, 500, "Internal server error");
		}).catch(function(err) {
			console.log(err);
			errorMessage(res, 500, "Internal server error");
		});
	}, function(err) {
		console.log(err);
		errorMessage(res, 500, "Internal server error");
	}).catch(function(err) {
		console.log(err);
		errorMessage(res, 500, "Internal server error");
	});
};

const readOne = (req, res) => {
	PictureModel.findOne({_id: req.params.pictureId, userId: req.params.userId}).then(function(data) {
		if (data === null) {
			errorMessage(res, 400, "Missing parameter or unexisting picture for user");
		} else {
			data = parseEntry(data);
			res.json(data);
		}
	}, function(err) {
		console.log(err);
		errorMessage(res, 400, "Missing parameter or unexisting picture for user");
	}).catch(function(err) {
		console.log(err);
		errorMessage(res, 500, "Internal server error");
	});
};

const create = (req, res) => {
	const picture = new PictureModel(req.body);
	picture.createdDate = Date.now();
	picture.userId = req.params.userId;
	const fileName = picture.userId + '/' + picture._id + req.files[0].originalname;
	const file = req.files[0].buffer;

    picture.url = 'https://s3.ca-central-1.amazonaws.com/images-ugram/' + fileName;

	picture.save().then(function(data) {
        UploadServices.uploadSample(fileName, file).then(function(data) {
            res.status(201).json({id: picture._id});
        }).catch(function(err) {
            console.log(err);
			errorMessage(res, 500, "Internal server error");
        });
	}, function(err) {
		console.log(err);
		errorMessage(res, 500, "Internal server error");
	}).catch(function(err) {
		console.log(err);
		errorMessage(res, 400, "Missing parameter or unexisting user");
	});
};

const update = (req, res) => {
	PictureModel.update({_id: req.params.pictureId, userId: req.params.userId}, {$set: req.body}).then(function(data) {
		if (data.n === 0) {
			errorMessage(res, 400, "Missing parameter or unexisting picture for user");
		}
		res.status(201).send('Created');
	}, function(err) {
		console.log(err);
		errorMessage(res, 400, "Missing parameter or unexisting picture for user");
	}).catch(function(err) {
		console.log(err);
		errorMessage(res, 500, "Internal server error");
	});
};

const deleteOne = (req, res) => {
	PictureModel.remove({_id: req.params.pictureId, userId: req.params.userId}).then(function(data) {
		if (data.n == 0) {
			errorMessage(res, 400, "Missing parameter or unexisting picture for user");
		}
		res.status(204).send('No Content');
	}, function(err) {
		console.log(err);
		errorMessage(res, 400, "Missing parameter or unexisting picture for user");
	}).catch(function(err) {
		console.log(err);
		errorMessage(res, 500, "Internal server error");
	});
};

export { readAll, readOne, readAllOfUser, deleteOne, create, update };
