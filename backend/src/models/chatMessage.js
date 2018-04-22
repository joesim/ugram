import { mongoose } from "../common/mongoose";

const ChatMessage = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"]
    },
    createdDate: {
      type: Number,
      required: [true, 'createdDate is required'],
    },
    message: {
      type: String,
      required: [true, "message is required"]
    }
  },
  { collection: "ChatMessage" }
);

let ChatMessageModel = mongoose.model("ChatMessage", ChatMessage);

export { ChatMessageModel };
