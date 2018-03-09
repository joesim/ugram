import winston from 'winston';
import WinstonCloudwatch from 'winston-cloudwatch';

if (process.env.CLOUDWATCH_GROUPENAME === undefined
    || process.env.CLOUDWATCH_STREAMNAME === undefined) {
	console.error("You need to set env variables: CLOUDWATCH_GROUPENAME | CLOUDWATCH_STREAMNAME");
	process.exit(0);
}

const logger = new winston.Logger({
    transports: [
        new WinstonCloudwatch({
            logGroupName: process.env.CLOUDWATCH_GROUPENAME,
            logStreamName: process.env.CLOUDWATCH_STREAMNAME,
            awsRegion: process.env.BUCKET_REGION,
            jsonMessage: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

logger.stream = {
	write: function(message, encoding){
		logger.info(message);
	}
};

export default logger;
