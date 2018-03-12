import * as Home from './home';
import * as TestUpload from './testUpload';
import * as Search from './search';

module.exports = function(app) {
	app.get('/', Home.home);
	app.get('/search',Search.search);
};
