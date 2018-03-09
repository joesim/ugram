import mongoose from 'mongoose';
import logger from './logger';

//Mongodb connection
if (process.env.MONGO_HOST === undefined
	|| process.env.MONGO_USER === undefined
	|| process.env.MONGO_DATABASE === undefined
	|| process.env.MONGO_PASSWORD === undefined) {
	console.error("You need to set env variables: MONGO_HOST | MONGO_USER | MONGO_PASSWORD | MONGO_DATABASE");
	process.exit(0);
}

logger.info("Connect to mongodb");
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`);

export { mongoose };
