import mongoose from "mongoose";
import logger from "./logger";

const env = process.env.NODE_ENV || "dev";

let mongoHost, mongoUser, mongoDatabase, mongoPassword, mongoUri, mongoPort;
if (
  process.env.MONGO_HOST === undefined ||
  process.env.MONGO_USER === undefined ||
  process.env.MONGO_DATABASE === undefined ||
  process.env.MONGO_PASSWORD === undefined ||
  process.env.MONGO_HOST_TEST === undefined ||
  process.env.MONGO_DATABASE_TEST === undefined ||
  process.env.MONGO_PORT_TEST === undefined
) {
  console.error(
    "You need to set env variables: MONGO_HOST | MONGO_USER | MONGO_PASSWORD | MONGO_DATABASE "
  );
  process.exit(0);
}

if (env == "test") {
  mongoHost = process.env.MONGO_HOST_TEST;
  mongoDatabase = process.env.MONGO_DATABASE_TEST;
  mongoPort = process.env.MONGO_PORT_TEST;
  mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDatabase}`;
} else {
  mongoHost = process.env.MONGO_HOST;
  mongoUser = process.env.MONGO_USER;
  mongoDatabase = process.env.MONGO_DATABASE;
  mongoPassword = process.env.MONGO_PASSWORD;
  mongoUri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}/${mongoDatabase}`;
}

mongoose.connect(mongoUri);
logger.info("Connected to mongodb");

export { mongoose };
