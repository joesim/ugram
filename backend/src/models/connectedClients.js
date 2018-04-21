import { mongoose } from "../common/mongoose";

const ConnectedClient = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, "userId is required"]
    },
    connectedInstances: [
      {
        type: String
      }
    ]
  },
  { collection: "ConnectedClients" }
);

let ConnectedClientsModel = mongoose.model("ConnectedClients", ConnectedClient);

export { ConnectedClientsModel };
