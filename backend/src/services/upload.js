const uploadSample = (body) => {
	const bucketName = 'glo3102-sample';
	const keyName = 'hello_world.txt';
	const params = {
		Bucket: bucketName,
		Key: keyName,
		Body: body
	};
	logger.info(`Uploading file "${keyName}" to bucket "${bucketName}" with body "${body}"`);
	return s3.putObject(params).promise();
};

export { uploadSample };
