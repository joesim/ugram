import { UserModel } from "../models/user";
import { errorMessage } from '../services';

export const isAuthorized = (req, res, next) => {
	if (req.params.userId === undefined && req.params.id === undefined)
		errorMessage(res, 400, "UserId is missing");
	else {
		let id = req.params.userId === undefined ? req.params.id : req.params.userId;
		if (id !== req.user.id) {
			errorMessage(res, 401, "Access token not match");
		} else {
			return next();
		}
	}
};
