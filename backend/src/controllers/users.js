import { UserModel } from '../models/user';
import { PictureModel } from '../models/picture';
import { parseEntry } from '../services';
import { s3 } from "../common/s3";

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
	UserModel.findOne({id: req.body.username, password: req.body.password}, (err, user) => {
		if (user === null)
			res.status(400).send('User not found');
		else {
			res.send("tokengenerated")
		}
	})
};

const oauth = (req, res) => {
	res.redirect('http://localhost:8080/#/login');
};

const oauthRedirect = (req, res) => {
	res.redirect(`http://localhost:8080/#/?accessToken=${req.user.accessToken}&userId=${req.user.userId}`);
};

const update = (req, res) => {
	UserModel.update({id: req.params.userId}, {$set: req.body}).then(function(data) {
		if (data.n === 0) {
			res.status(400).send('Missing parameter or unexisting user');
		}
		UserModel.findOne({id: req.params.userId}).then(function(data) {
			res.status(201).send(data);
		});
	}, function(err) {
		console.log(err);
		res.status(400).send('Missing parameter or unexisting user');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

const deleteOne = (req, res) => {

    function emptyBucket() {
        var params = {
            Bucket: 'images-ugram',
            Prefix: req.params.id + '/'
        };

        s3.listObjects(params, function(err, data) {
            if (err) {
                console.log(err);
                res.status(500).send('An error occured');
            }

            if (data && data.Contents && data.Contents.length != 0) {
                params = {Bucket: 'images-ugram'};
                params.Delete = {Objects:[]};

                data.Contents.forEach(function(content) {
                    params.Delete.Objects.push({Key: content.Key});
                });

                s3.deleteObjects(params, function(err, data) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('An error occured');
                    }
                    if (data && data.Contents && data.Contents.length == 1000) {
                        emptyBucket();
                    }
                    else {
                        console.log('Images successfully deleted');
                    }
                });
            }
        });
    }

    emptyBucket();

	UserModel.remove({id: req.params.id}).then(function(data) {
		if (data.n == 0) {
			res.status(400).send('Missing parameter or unexisting picture for user');
		}
        PictureModel.remove({userId: req.params.id}).then(function(data) {
            res.status(204).send('No Content');
		}, function(err) {
            console.log(err);
            res.status(400).send('Missing parameter or unexisting picture for user');
        });

	}, function(err) {
		console.log(err);
		res.status(400).send('Missing parameter or unexisting picture for user');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

export { create, update, readOne, readAll, deleteOne, oauth, oauthRedirect, login };
