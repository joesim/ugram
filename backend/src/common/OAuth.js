import UserModel from '../models/user';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;

passport.use(
	new GoogleStrategy({
		callbackURL: '/auth/google/redirect',
		clientID: '187358751033-lii503ugl0h09fed2p6vli6pn7t5325o.apps.googleusercontent.com',
		clientSecret: 'P7JfcwoEuHr78QAsfOXLKJeF'
    }, 
    function(accessToken, refreshToken, profile, cb) {
        const userInfo = {
            id: profile.id,
            email: profile.emails[0].value,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            phoneNumber: "",
            pictureUrl: profile.image !== undefined ? profile.image.url : "",
            registrationDate: Date.now()
        }
//        console.log(userInfo);

        return cb(null, userInfo);
        //User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //    return cb(err, user);
        //});
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});
  
passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

export default passport