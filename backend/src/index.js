import {} from 'dotenv/config';
import logger from './common/logger';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errors = require('./common/errors');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

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

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());
passport.use(
	new GoogleStrategy({
		callbackURL: '/auth/google/redirect',
		clientID: '187358751033-lii503ugl0h09fed2p6vli6pn7t5325o.apps.googleusercontent.com',
		clientSecret: 'P7JfcwoEuHr78QAsfOXLKJeF'
    }, 
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.use(errors.genericErrorHandler);

require('./controllers')(app);

const port = process.env.PORT || 3000;
app.listen(port);

logger.info(`App started on port ${port}`)
