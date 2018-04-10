import { mongoose } from '../common/mongoose';

const CommentSchema = mongoose.Schema({
	createdDate: {
		type: Number,
		default: Date.now(),
	},
	message: {
		type: String,
		maxlength: [500, 'Message is too long (max 500 characters)'],
	},
	author: [{
		type: String,
		required: [true, 'userId is required'],
	}],
	read: {
        type: Boolean,
        default: false,
    }
});

export default CommentSchema;
