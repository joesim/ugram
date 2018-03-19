import { mongoose } from "../common/mongoose";
import { s3 } from "../common/s3";

if (process.env.BUCKET_IMAGE_NAME === undefined
	|| process.env.BUCKET_IMAGE_LINK === undefined) {
	console.error("You need to set env variables: BUCKET_IMAGE_NAME | BUCKET_IMAGE_LINK");
	process.exit(0);
}

const uploadSample = (keyName, body) => {
	const bucketName = process.env.BUCKET_IMAGE_NAME;
	const params = {
		Bucket: bucketName,
		Key: keyName,
		Body: body
	};
	return s3.putObject(params).promise();
};

export { uploadSample };
