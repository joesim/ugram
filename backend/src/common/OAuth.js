import { UserModel } from '../models/user';

if (process.env.GOOGLE_CLIENT_ID === undefined
	|| process.env.GOOGLE_CLIENT_SECRET === undefined) {
	console.error("You need to set env variables: GOOGLE_CLIENT_ID | GOOGLE_CLIENT_SECRET");
	process.exit(0);
}

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
	new GoogleStrategy({
		callbackURL: '/auth/google/redirect',
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET
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