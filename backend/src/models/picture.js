import { mongoose } from '../common/mongoose';
import CommentSchema from './comment';
import ReactionSchema from './reaction';

const PictureSchema = mongoose.Schema({
	createdDate: {
		type: Number,
		required: [true, 'createdDate is required'],
	},
	name: {
        type: String,
        maxlength: [100, 'Name is too long (max 100 characters)'],
	},
	description: {
		type: String,
		maxlength: [500, 'Description is too long (max 500 characters)'],
	},
	mentions: [{
		type: String,
		maxlength: [255, 'Mention is too long (max 255 characters)'],
	}],
	tags: [{
		type: String,
		maxlength: [100, 'Tag is too long (max 100 characters)'],
	}],
	url: {
		type: String,
		required: [true, 'Url is required'],
		maxlength: [255, 'Url is too long (max 255 characters)'],
	},
	userId: {
		type: String,
		required: [true, 'userId is required'],
	},
	comments:[CommentSchema],
	reactions:[ReactionSchema],
}, {collection: 'Pictures'});

PictureSchema.index({ description: "text" });
let PictureModel = mongoose.model("Pictures", PictureSchema);

export { PictureModel };
