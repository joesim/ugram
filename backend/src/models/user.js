import { mongoose } from '../common/mongoose';

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Email is required'],
		maxlength: [100, 'Email is too long (max 255 characters)'],
	},
	firstName: {
		type: String,
		required: [true, 'First name is required'],
		maxlength: [100, 'First name is too long (max 255 characters)'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required'],
		maxlength: [100, 'Last name is too long (max 255 characters)'],
	},
	phoneNumber: {
		type: String,
		maxlength: [20, 'First name is too long (max 255 characters)'],
	},
	pictureUrl: {
		type: String,
		maxlength: [255, 'First name is too long (max 255 characters)'],
	},
	registrationDate: {
		type: Date,
		required: [true, 'Registration date is required'],
	},
	//facebook: {...}
}, {collection: 'Users'});

let UserModel = mongoose.model('Users', UserSchema);

export { UserModel };
