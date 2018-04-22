import { ConnectedClientsModel } from "../models";
import logger from "../common/logger";
import { socket } from "../";
import { parseEntry } from '../services';

export const notifyMessage = async (req, res) => {
  try {
    const connectedClientsModels = await ConnectedClientsModel.find({});
    if (connectedClientsModels !== null) {
      for (let connectedClientModel of connectedClientsModels) {
        const connectedInstances = connectedClientModel.connectedInstances;
        for (let socketId of connectedInstances) {
          socket.of("/").connected[socketId].emit("message", parseEntry(req.extra.message));
        }
      }
    } else {
      logger.info("the client is not connected right now or unreachable");
    }
  } catch (error) {
    logger.error(`unnable to notify the client(s): ${error}`);
  }
};