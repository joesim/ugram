import { mongoose } from "../common/mongoose";

const ReactionSchema = mongoose.Schema({
  createdDate: {
    type: Number,
    default: Date.now()
  },
  author: {
    type: String,
    required: [true, "userId is required"]
  },
  read: {
    type: Boolean,
    default: false
  }
});

export default ReactionSchema;
