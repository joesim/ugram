import {} from 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import * as http from 'http';
import io from 'socket.io';

import logger from './common/logger';
import passport from './common/OAuth';
import errors from './common/errors';
import controllers from './controllers';
import { events } from './events/index';
import { cleanDB } from './common/cleanDB';

const app = express();
const server = http.createServer(app);
const socket = io(server);

const corsOptions = {
    origin: '*',
    methods: [
        'GET',
        'PUT',
        'POST',
        'PATCH',
        'DELETE',
        'UPDATE',
        "OPTIONS"
    ],
    credentials: true
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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
