import * as Home from './home';
import * as Users from './users';
import * as Pictures from './pictures';
import passport from '../common/OAuth';
import * as Search from './search';
import { isAuthenticated } from "../middlewares/authentification";
import { isAuthorized } from "../middlewares/authorization";
import { frontend_url } from "../constants";

const multer = require('multer');
const upload = multer();

module.exports = function(app) {
	app.get('/', Home.home);
	app.get('/users', Users.readAll);
	app.get('/users/:userId', Users.readOne);
	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email' ]}), Users.oauth);
	app.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: `${frontend_url}/#/signup` }), Users.oauthRedirect);
	app.put('/users/:userId', isAuthenticated, isAuthorized,  Users.update);
	app.post('/signup', Users.create);
	app.post('/login', Users.login);
	app.post('/users/:userId/pictures', isAuthenticated, isAuthorized, upload.any(), Pictures.create);
	app.get('/pictures', Pictures.readAll);
	app.get('/users/:userId/pictures', Pictures.readAllOfUser);
	app.get('/users/:userId/pictures/:pictureId', Pictures.readOne);
	app.put('/users/:userId/pictures/:pictureId', isAuthenticated, isAuthorized,Pictures.update);
	app.delete('/users/:userId/pictures/:pictureId', isAuthenticated, isAuthorized, Pictures.deleteOne);
	app.delete('/users/:id', isAuthenticated, isAuthorized, Users.deleteOne);
	app.get('/search', Search.search);
};
