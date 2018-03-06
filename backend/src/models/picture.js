import { mongoose } from '../common/mongoose';

const PictureSchema = mongoose.Schema({
	createdDate: Date,
	description: String,
	mentions: [String],
	tags: [String],
	url: String,
	userId: String,
}, {collection: 'Pictures'});

let PictureModel = mongoose.model('Pictures', PictureSchema);

PictureModel.getAll = () => {
	return PictureModel.find({});
};

PictureModel.addCar = (pictureToAdd) => {
	return pictureToAdd.save();
};

export { PictureModel };
