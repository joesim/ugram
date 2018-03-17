import { UserModel } from '../models/user';

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
            password : profile.id,
            accessToken : accessToken,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            phoneNumber: 0,
            pictureUrl: profile.image !== undefined ? profile.image.url : "",
            registrationDate: Date.now()
        };

        UserModel.findOne({id:userInfo.id}, (err, res) => {
            if (res === null) {
                const user = new UserModel(userInfo);
                user.save().then(() => {
	                return cb(null, {
		                accessToken,
		                userId: userInfo.id
	                });
                });
            } else {
                UserModel.update({id:userInfo.id}, {accessToken}, () => {
	                return cb(null, {
		                accessToken,
		                userId: userInfo.id
	                });
                });
            }
        })
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

export default passport