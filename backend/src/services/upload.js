import { mongoose } from "../common/mongoose";
import { s3 } from "../common/s3";

const uploadSample = (keyName, body) => {
	const bucketName = 'images-ugram';
	//const keyName = 'hello_world.txt';
	const params = {
		Bucket: bucketName,
		Key: keyName,
		Body: body
	};
//	logger.info(`Uploading file "${keyName}" to bucket "${bucketName}" with body "${body}"`);
	return s3.putObject(params).promise();
};

export { uploadSample };
