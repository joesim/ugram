import Schema from 'mongoose';

const UserSchema = new Schema({
	email: String,
	firstName: String,
	lastName: String,
	id: String,
	phoneNumber: Number,
	pictureUrl: String,
	registrationDate: Date,
	//facebook: {...}
});

export { UserSchema };
