import AWS from 'aws-sdk';
import logger from './logger';

if (process.env.AWS_ACCESS_KEY_ID === undefined
	|| process.env.AWS_SECRET_ACCESS_KEY === undefined
	|| process.env.BUCKET_REGION === undefined) {
	logger.error("You need to set env variables: AWS_ACCESS_KEY_ID | AWS_SECRET_ACCESS_KEY | BUCKET_REGION");
	process.exit(0);
}

AWS.config.update({
		accessKeyId:     process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
		region:          process.env.BUCKET_REGION
});

const s3 = new AWS.S3();

export { s3 };
