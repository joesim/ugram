import { HomeServices } from '../services';

const home = (req, res) => {
	return res.send(HomeServices.getSample());
};

export { home };
