const winston = require('winston');
const WinstonCloudwatch = require('winston-cloudwatch');

const logger = new winston.Logger({
    transports: [
      new WinstonCloudwatch({
            logGroupName: 'ugram',
            logStreamName: 'ugram-backend',
            awsRegion: process.env.BUCKET_REGION,
            jsonMessage: true
        }),
        new winston.transports.Console({
            level: 'info',
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

module.exports = logger;
