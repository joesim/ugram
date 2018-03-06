import * as Home from './home-controller';

module.exports = function(app) {
	app.get('/', Home.home);
};
