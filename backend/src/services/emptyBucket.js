import { s3 } from "../common/s3";
import logger from "../common/logger";

const emptyBucket = (req, res) => {
	let params = {
		Bucket: process.env.BUCKET_IMAGE_NAME,
		Prefix: req.params.id + '/'
	};

	s3.listObjects(params, function(err, data) {
		if (err) {
			logger.error(err.message);
			errorMessage(res, 500, "Internal server error");
		}

		if (data && data.Contents && data.Contents.length !== 0) {
			params = {Bucket: process.env.BUCKET_IMAGE_NAME};
			params.Delete = {Objects:[]};

			data.Contents.forEach(function(content) {
				params.Delete.Objects.push({Key: content.Key});
			});

			s3.deleteObjects(params, function(err, data) {
				if (err) {
					logger.error(err.message);
					errorMessage(res, 500, "Internal server error");
				}
				if (data && data.Contents && data.Contents.length === 1000) {
					emptyBucket(req, res);
				}
				else {
					logger.info("Images successfully deleted");
				}
			});
		}
	});
}

export default emptyBucket;
