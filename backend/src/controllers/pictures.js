import { PictureModel } from '../models/picture';
import { UserModel } from '../models/user';
import { parseEntry } from '../services';
import { UploadServices } from '../services';

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
			data.items = rawData.map(parseEntry);
			console.log(data.items);
			res.json(data);
		}, function(err) {
			console.log(err);
			res.status(500).send('An error occured');
		}).catch(function(err) {
			console.log(err);
			res.status(500).send('An error occured');
		});
	}, function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

const readAllOfUser = (req, res) => {
	const limit = parseInt(req.query.perPage) || 10;
	const offset = parseInt(req.query.page) * limit;

	// Just to check for error with user
	UserModel.findOne({id: req.params.userId}).then(function(data) {
	}, function(err) {
		console.log(err);
		res.status(400).send('Missing parameter or unexisting user');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
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
			res.status(500).send('An error occured');
		}).catch(function(err) {
			console.log(err);
			res.status(500).send('An error occured');
		});
	}, function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

const readOne = (req, res) => {
	PictureModel.findOne({_id: req.params.pictureId, userId: req.params.userId}).then(function(data) {
		if (data === null) {
			res.status(400).send('Missing parameter or unexisting picture for user');
		} else {
			data = parseEntry(data);
			res.json(data);
		}
	}, function(err) {
		console.log(err);
		res.status(400).send('Missing parameter or unexisting picture for user');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

const create = (req, res) => {
	const picture = new PictureModel(req.body);
	picture.createdDate = Date.now();
	picture.userId = req.params.userId;

	console.log('------------------ req body =', req.body);
    console.log('------------------ req params =', req.params);

	// Todo: upload image
	picture.url = 'http://i0.kym-cdn.com/entries/icons/original/000/004/949/trolldad.jpg';
	


	picture.save().then(function(data) {
		UploadServices.uploadSample("foobar.jpeg", req.body.pictureModel[3]).then(function(data) {
			console.log('data = ', data);
            res.status(201).json({id: picture._id});
        }).catch(function(err) {
            console.log(err);
            res.status(500).send('An error occured');
        });
	}, function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	}).catch(function(err) {
		console.log(err);
		res.status(400).send('Missing parameter or unexisting user');
	});
};

const update = (req, res) => {
	PictureModel.update({_id: req.params.pictureId, userId: req.params.userId}, {$set: req.body}).then(function() {
		if (data.n == 0) {
			res.status(400).send('Missing parameter or unexisting picture for user');
		}
		res.status(201).send('Created');
	}, function(err) {
		console.log(err);
		res.status(400).send('Missing parameter or unexisting picture for user');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

const deleteOne = (req, res) => {
	PictureModel.remove({_id: req.params.pictureId, userId: req.params.userId}).then(function(data) {
		if (data.n == 0) {
			res.status(400).send('Missing parameter or unexisting picture for user');
		}
		res.status(204).send('No Content');
	}, function(err) {
		console.log(err);
		res.status(400).send('Missing parameter or unexisting picture for user');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

export { readAll, readOne, readAllOfUser, deleteOne, create, update };
