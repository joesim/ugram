import { mongoose } from '../common/mongoose';

const UserSchema = new Schema({
	email: String,
	firstName: String,
	lastName: String,
	id: String,
	phoneNumber: Number,
	pictureUrl: String,
	registrationDate: Date,
	//facebook: {...}
}, {collection: 'Users'});

let UserModel = mongoose.model('Users', UserSchema);

UserModel.getAll = () => {
	return UserModel.find({});
};

UserModel.addCar = (userToAdd) => {
	return userToAdd.save();
};

export { UserModel };
