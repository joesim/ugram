import Schema from 'mongoose';

const PictureSchema = new Schema({
	createdDate: Date,
	description: String,
	mentions: [String],
	tags: [String],
	url: String,
	userId: String,
});

export { PictureSchema };
