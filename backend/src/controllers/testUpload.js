import { UploadServices } from '../services';

const testUpload = (req, res) => {
	UploadServices.uploadSample("TEST").then(function(data) {
		return res.send('Upload successful');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

export { testUpload };
