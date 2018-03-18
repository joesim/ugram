import { s3 } from "../common/s3";

const emptyBucket = (req, res) => {
	let params = {
		Bucket: 'images-ugram',
		Prefix: req.params.id + '/'
	};

	s3.listObjects(params, function(err, data) {
		if (err) {
			console.log(err);
			errorMessage(res, 500, "Internal server error");
		}

		if (data && data.Contents && data.Contents.length !== 0) {
			params = {Bucket: 'images-ugram'};
			params.Delete = {Objects:[]};

			data.Contents.forEach(function(content) {
				params.Delete.Objects.push({Key: content.Key});
			});

			s3.deleteObjects(params, function(err, data) {
				if (err) {
					console.log(err);
					errorMessage(res, 500, "Internal server error");
				}
				if (data && data.Contents && data.Contents.length === 1000) {
					emptyBucket(req, res);
				}
				else {
					console.log('Images successfully deleted');
				}
			});
		}
	});
}

export default emptyBucket;
