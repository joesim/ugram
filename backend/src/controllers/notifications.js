import { errorMessage } from "../services";
import { PictureModel } from "../models";

const readNotifications = async (req, res, next) => {
	try {
		const userId = req.params.userId;
		const comments = req.body.comments;
		const reactions = req.body.reactions;

		comments.forEach(async comment => {
			await readNotification(
				{ userId, comments: { $elemMatch: { _id: comment } } },
				{ $set: { "comments.$.read": true } }
			);
		});

		reactions.forEach(async reaction => {
			await readNotification(
				{ userId, reactions: { $elemMatch: { _id: reaction } } },
				{ $set: { "reactions.$.read": true } }
			);
		});

		res.status(201).send("Success");
	} catch (error) {
		errorMessage(res, 500, "Internal server error");
	}

	return next();
};

const readNotification = async (query, data) => {
	return await PictureModel.findOneAndUpdate(
		query,
		data
	);
};

export { readNotifications };
