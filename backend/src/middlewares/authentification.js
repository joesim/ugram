import { UserModel } from "../models/user";
import { errorMessage } from '../services';

export const isAuthenticated = (req, res, next) => {
	let accessToken = retrieveToken(req);

	if (accessToken) {
		accessToken = accessToken.replace("Bearer ", "");

		try {
			UserModel.findOne({accessToken}, function (err, user) {
				if (!err) {
					if (user) {
						req.user = user;
						return next()
					} else {
						errorMessage(res, 401, "User associated with token was not found");
					}
				}
			});
		} catch (err) {
			errorMessage(res, 401, "Error retrieving user associated with token");
		}

	} else {
		errorMessage(res, 401, "Access token is missing");
	}
};

const retrieveToken = (req) => {
	return (req.headers['authorization']);
};
