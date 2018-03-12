import { PictureModel } from '../models/picture';
import { UserModel } from '../models/user';
import { parseEntry } from '../services';

const readAll = (req, res) => {
	const limit = parseInt(req.query.perPage) || 10;
	const offset = parseInt(req.query.page) * limit;
	
	PictureModel.find({}).sort({createdDate: 1}).limit(limit).skip(offset).then(function(data) {
		data = data.map(parseEntry);
		res.json(data);
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
	UserModel.findOne({_id: req.params.userId}).then(function(data) {
	}, function(err) {
		console.log(err);
		res.status(400).send('Missing parameter or unexisting user');	
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});

	PictureModel.find({userId: req.params.userId}).sort({createdDate: 1}).limit(limit).skip(offset).then(function(data) {
		data = data.map(parseEntry);
		res.json(data);
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

	// Todo: upload image
	picture.url = 'http://i0.kym-cdn.com/entries/icons/original/000/004/949/trolldad.jpg';

	picture.save().then(function(data) {
		res.status(201).json({id: picture._id});
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
