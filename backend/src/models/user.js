import { mongoose } from '../common/mongoose';

const UserSchema = new mongoose.Schema({
	id: {
		type: String,
		required: [true, 'Username is required'],
		maxlength: [100, 'Username is too long (max 100 characters)'],
		//unique: true,
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		maxlength: [100, 'Email is too long (max 100 characters)'],
	},
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		maxlength: [100, 'First name is too long (max 100 characters)'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		maxlength: [100, 'Last name is too long (max 100 characters)'],
	},
	phoneNumber: {
		type: Number,
	},
	pictureUrl: {
		type: String,
		maxlength: [255, 'Picture url is too long (max 255 characters)'],
	},
	registrationDate: {
		type: Number,
		required: [true, 'Registration date is required'],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	accessToken: {
		type: String,
	}
}, {collection: 'Users'});

let UserModel = mongoose.model('Users', UserSchema);

export { UserModel };
