import { errorMessage, findAuthor } from "../services";
import { PictureModel } from "../models";

const postComment = async (req, res, next) => {
	try {
		const pictureId = req.params.pictureId;
		const author = await findAuthor(req);
		const message = req.body.message === undefined ? "" : req.body.message;

		const pictureModel = await addComment(pictureId, author, message);
		const response = pictureModel.comments.pop();

		res.status(201).send(response);
	} catch (error) {
		errorMessage(res, 500, "Internal server error");
	}

	return next();
};

const addComment = async (pictureId, author, message) => {
	return await PictureModel.findOneAndUpdate(
		{ _id: pictureId },
		{ $push: { comments: { author, message } } },
		{ new: true }
	);
};

export { postComment };
