import { UserModel } from '../models/user';
import { parseEntry } from '../services';

const readAll = (req, res) => {
	const limit = parseInt(req.query.perPage) || 10;
	const offset = parseInt(req.query.page) * limit;

	UserModel.find({}).limit(limit).skip(offset).then(function(data) {
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
	UserModel.findOne({_id: req.params.userId}).then(function(data) {
		if (data === null) {
			res.status(400).send('Missing parameter or unexisting user');
		} else {
			data = parseEntry(data);
			res.json(data);
		}
	}, function(err) {
		console.log(err);
		res.status(500).send('An error occured');	
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

const create = (req, res) => {
	const user = new UserModel(req.body);
	user.registrationDate = Date.now();
	user.save().then(function(data) {
		res.status(201).send('Created');
	}, function(err) {
		console.log(err);
		res.status(400).send('Missing parameter');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

const update = (req, res) => {
	UserModel.update({_id: req.params.userId}, {$set: req.body}).then(function(data) {
		if (data.n == 0) {
			res.status(400).send('Missing parameter or unexisting user');	
		}
		res.status(201).send('Created');
	}, function(err) {
		console.log(err);
		res.status(400).send('Missing parameter or unexisting user');	
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

export { create, update, readOne, readAll };
