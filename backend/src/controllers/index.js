import * as Home from './home';
import * as Users from './users';
import * as Pictures from './pictures';
import * as TestUpload from './testUpload';
import passport from '../common/OAuth';

module.exports = function(app) {
	app.get('/', Home.home);
	// app.get('/upload', TestUpload.testUpload);
	app.get('/users', Users.readAll);
	app.get('/users/:userId', Users.readOne);
	app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email' ]}), Users.oauth);
	app.get('/auth/google/redirect', passport.authenticate('google', { failureRedirect: 'http://localhost:8080/signup' }), Users.oauthRedirect);
	app.put('/users/:userId', Users.update);
	app.post('/signup', Users.create);
	app.post('/users/:userId/pictures', Pictures.create);
	app.get('/pictures', Pictures.readAll);
	app.get('/users/:userId/pictures', Pictures.readAllOfUser);
	app.get('/users/:userId/pictures/:pictureId', Pictures.readOne);
	app.put('/users/:userId/pictures/:pictureId', Pictures.update);
	app.delete('/users/:userId/pictures/:pictureId', Pictures.deleteOne);
	app.delete('/users/:id', Users.deleteOne);
};
