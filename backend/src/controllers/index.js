import * as Home from './home';
import * as TestUpload from './testUpload';

module.exports = function(app) {
	app.get('/', Home.home);
	app.get('/upload', TestUpload.testUpload)
};
