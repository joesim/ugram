const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const errors = require('./common/errors');
const logger = require('./common/logger');
require('dotenv').config();

const app = express();
const corsOptions = {
    origin: '*',
    methods: [
        'GET',
        'PUT',
        'POST',
        'PATCH',
        'DELETE',
        'UPDATE'
    ],
    credentials: true
};

// const winston = require('winston');
// const winstonCloudWatch = require('winston-cloudwatch');
//
// winston.add(winstonCloudWatch, {
//     logGroupName: 'glo3012',
//     logStreamName: 'sample'
// });

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use(errors.genericErrorHandler);
// Enables access-logs on each calls
//app.use(morgan('combined', {'stream': logger.stream}));

//Mongodb connection
if (process.env.MONGO_HOST === undefined
    || process.env.MONGO_USER === undefined
	|| process.env.MONGO_DATABASE === undefined
	|| process.env.MONGO_PASSWORD === undefined) {
	console.error("You need to set env variables: MONGO_HOST | MONGO_USER | MONGO_PASSWORD");
	process.exit(0);
}
mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`);

require('./controllers')(app);

const port = process.env.PORT || 3000;
app.listen(port);

logger.info(`App started on port ${port}`)
