import { UploadServices } from '../services';
import { s3 } from "../common/s3";

const testUpload = (req, res) => {

	UploadServices.uploadSample("TEST").then(function(data) {
		return res.send('Upload successful');
	}).catch(function(err) {
		console.log(err);
		res.status(500).send('An error occured');
	});
};

export { testUpload };
