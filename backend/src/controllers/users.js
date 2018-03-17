import { UserModel } from '../models/user';
import { parseEntry } from '../services';

const readAll = (req, res) => {
	const limit = parseInt(req.query.perPage) || 10;
	const offset = parseInt(req.query.page) * limit;

	UserModel.count({}).then(function(count) {
		const totalEntries = count;
		const totalPages = totalEntries == 0 ? 0 : parseInt((totalEntries - 1) / limit) + 1;

		UserModel.find({}).limit(limit).skip(offset).then(function(rawData) {
			const data = {};
			data.totalEntries = totalEntries;
			data.totalPages = totalPages;
			data.items = rawData.map(parseEntry);
			console.log(data);
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
	UserModel.findOne({id: req.params.userId}).then(function(data) {
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
	const userInfos = {
		...req.body,
		registrationDate: Date.now(),
		accessToken: ""
	};
	const user = new UserModel(userInfos);
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

const login = (req, res) => {
	if (req.body.username === undefined
		|| req.body.password === undefined)
		res.status(400).send('Missing username or password');
	UserModel.findOne({id: req.body.username, password: req.body.password}, (err, res) => {
		console.log(res);
		if (res === null)
			res.status(400).send('User not found');
		else {
			console.log(res);
		}
	})
};

const oauth = (req, res) => {
	res.redirect('/');
};

const oauthRedirect = (req, res) => {
	res.redirect(`http://localhost:8080/#/?accessToken=${req.user}`);
};

const login = (req, res) => {
	//todo
};

const update = (req, res) => {
	UserModel.update({id: req.params.userId}, {$set: req.body}).then(function(data) {
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

const deleteOne = (req, res) => {
	UserModel.remove({id: req.params.id}).then(function(data) {
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

export { create, update, readOne, readAll, deleteOne, oauth, oauthRedirect, login };
