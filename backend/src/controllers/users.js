import { UserModel } from '../models/user';
import { PictureModel } from '../models/picture';
import { parseEntry } from '../services';
import crypto from "crypto";
import { errorMessage } from "./errorMessageHelper";
import { frontend_url } from "../constants";
import { emptyBucket } from "../services";
import logger from "../common/logger";
const password = require('crypto-password-helper');

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
			res.json(data);
		}, function(err) {
			logger.error(err.message);
			errorMessage(res, 500, "Internal server error");
		}).catch(function(err) {
			logger.error(err.message);
			errorMessage(res, 500, "Internal server error");
		});
	}, function(err) {
		logger.error(err.message);
		errorMessage(res, 500, "Internal server error");
	}).catch(function(err) {
		logger.error(err.message);
		errorMessage(res, 500, "Internal server error");
	});
};

const readOne = (req, res) => {
	UserModel.findOne({id: req.params.userId}).then(function(data) {
		if (data === null) {
			errorMessage(res, 400, "Missing parameter or unexisting user");
		} else {
			data = parseEntry(data);
			res.json(data);
		}
	}, function(err) {
		logger.error(err.message);
		errorMessage(res, 500, "Internal server error");
	}).catch(function(err) {
		logger.error(err.message);
		errorMessage(res, 500, "Internal server error");
	});
};

const create = (req, res) => {
	const newpassword = req.body.password;
    const hash = password.encryptSync(newpassword);

    req.body.password = hash;
	const userInfos = {
		...req.body,
		registrationDate: Date.now(),
		accessToken: ""
	};
	const user = new UserModel(userInfos);
	user.save().then(function(data) {
		res.status(201).send("Created");
	}, function(err) {
		logger.error(err.message);
		errorMessage(res, 400, "Missing parameter or username already used");
	}).catch(function(err) {
		logger.error(err.message);
		errorMessage(res, 500, "Internal server error");
	});
};

const login = (req, res) => {
	if (req.body.username === undefined
		|| req.body.password === undefined)
		errorMessage(res, 400, "Missing username or password");
	const hash = password.encryptSync(req.body.password);
	crypto.randomBytes(30, (err, buffer) => {
		const accessToken = buffer.toString("hex");
		UserModel.findOneAndUpdate({id: req.body.username}, {accessToken}, (err, user) => {
			if (user === null)
				errorMessage(res, 400, "User not found");
			else {
				const isMatch = password.compareSync(req.body.password, user.password);
				if (!isMatch)
					errorMessage(res, 401, "Bad username or password");
				else
					res.send(accessToken);
			}
		})
	})
};

const oauth = (req, res) => {
	res.redirect(`${frontend_url}/#/login`);
};

const oauthRedirect = (req, res) => {
	res.redirect(`${frontend_url}/#/?accessToken=${req.user.accessToken}&userId=${req.user.userId}`);
};

const update = (req, res) => {
	UserModel.update({id: req.params.userId}, {$set: req.body}).then(function(data) {
		if (data.n === 0) {
			errorMessage(res, 400, "Missing parameter or unexisting user");
		}
		UserModel.findOne({id: req.params.userId}).then(function(data) {
			res.status(201).send(data);
		});
	}, function(err) {
		logger.error(err.message);
		errorMessage(res, 400, "Missing parameter or unexisting user");
	}).catch(function(err) {
		logger.error(err.message);
		errorMessage(res, 500, "Internal server error");
	});
};

const deleteOne = (req, res) => {
	UserModel.remove({id: req.params.id}).then(function(data) {
		if (data.n == 0) {
			errorMessage(res, 400, "Missing parameter or unexisting picture for user");
		}
        PictureModel.remove({userId: req.params.id}).then(function(data) {
	        emptyBucket(req, res);
	        res.status(204).send('No Content');
		}, function(err) {
            logger.error(err.message);
			errorMessage(res, 400, "Missing parameter or unexisting picture for user");
        });

	}, function(err) {
		logger.error(err.message);
		errorMessage(res, 400, "Missing parameter or unexisting picture for user");
	}).catch(function(err) {
		logger.error(err.message);
		errorMessage(res, 500, "Internal server error");
	});
};

export { create, update, readOne, readAll, deleteOne, oauth, oauthRedirect, login };
