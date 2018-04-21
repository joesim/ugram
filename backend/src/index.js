import {} from "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import * as http from "http";
import io from "socket.io";
import helmet from "helmet";
import errors from "./common/errors";
import events from "./events";
import controllers from "./controllers";
import passport from "./common/OAuth";
import logger from "./common/logger";
import cleanDB from "./common/cleanDB";

const app = express();
const server = http.createServer(app);

const socket = io(process.env.WS_SERVER_URL || server);

const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "UPDATE", "OPTIONS"],
  credentials: true
};

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(errors.genericErrorHandler);
app.use(cors(corsOptions));

controllers(app);
events(socket);

const port = process.env.PORT || 3000;

server.listen(port);

cleanDB();

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
  logger.info(`App started on port ${port}`);
}

export { server, socket };
