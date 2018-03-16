import {} from 'dotenv/config';
import logger from './common/logger';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errors = require('./common/errors');

const app = express();
const corsOptions = {
  origin: "*",
  methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "UPDATE"],
  credentials: true
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

app.use(errors.genericErrorHandler);


require("./controllers")(app);

const port = process.env.PORT || 3000;
app.listen(port);
if (process.env.NODE_ENV != "test") {
    app.use(morgan("dev"));
    logger.info(`App started on port ${port}`);
  }


export { app };
