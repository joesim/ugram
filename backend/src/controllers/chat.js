import { errorMessage } from "../services";
import { ChatMessageModel } from "../models";
import { parseEntry, findAuthor } from '../services';

const postMessage = async (req, res, next) => {
	try {
		const message = new ChatMessageModel({
			userId: await findAuthor(req),
			message: req.body.message === undefined ? "" : req.body.message,
			createdDate: Date.now()
		});
		message.save().then(function(data) {
			res.status(201).send("Created");
		}, function(err) {
			errorMessage(res, 500, "Internal server error");
		}).catch(function(err) {
			errorMessage(res, 500, "Internal server error");
		});

		req.extra = { message };
	} catch (error) {
		errorMessage(res, 500, "Internal server error");
	}

	return next();
};

const readMessages = async (req, res, next) => {
	ChatMessageModel.find({}).sort({createdDate: -1}).limit(5).then(function(rawData) {
		let data = rawData.map(parseEntry);
		res.json(data);
	}, function(err) {
		errorMessage(res, 500, "Internal server error");
	}).catch(function(err) {
		errorMessage(res, 500, "Internal server error");
	});
};

export { postMessage, readMessages };
