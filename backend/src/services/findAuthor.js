import { UserModel } from "../models";

const findAuthor = async req => {
	let accessToken = retrieveToken(req);
	let author;
	accessToken = accessToken.replace("Bearer ", "");

	const userModel = await UserModel.findOne({ accessToken });
	author = userModel.id;

	return author;
};

const retrieveToken = req => {
	return req.headers["authorization"];
};

export default findAuthor;