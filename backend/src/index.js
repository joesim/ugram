import {} from 'dotenv/config';
import logger from './common/logger';
import passport from './common/OAuth';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errors = require('./common/errors');

const app = express();
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

require('./controllers')(app);

const port = process.env.PORT || 3000;
app.listen(port);
if (process.env.NODE_ENV != "test") {
    app.use(morgan("dev"));
    logger.info(`App started on port ${port}`);
  }


export { app };
