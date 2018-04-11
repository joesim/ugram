import { mongoose } from "../common/mongoose";

const NotificationSchema = mongoose.Schema(
  {
    pictureId: {
      type: String,
      required: [true, "pictureId is required"]
    },
    pictureUrlAuthor: {
      type: String
    },
    authorId: {
      type: String,
      required: [true, "authorId is required"]
    },
    createdDate: {
      type: Number,
      required: [true, "createdDate is required"]
    },
    type: {
      type: String,
      enum: ["comment", "reaction"],
      required: [true, "type is required"]
    },
    read: {
      type: Boolean,
      required: [true, "read status is required"]
    }
  },
  { collection: "Notifications" }
);

let NotificationModel = mongoose.model("Notifications", NotificationSchema);

export default NotificationModel;
