import { UserModel } from "../models/user";

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
						return res.status(401).send({
							message: 'User associated with token was not found'
						});
					}
				}
			});
		} catch (err) {
			return res.status(401).send({
				message: 'Error retrieving user associated with token'
			});
		}

	} else {
		return res.status(401).send({
			message: 'Access token is missing'
		});
	}
};

const retrieveToken = (req) => {
	return (req.headers['authorization']);
};
