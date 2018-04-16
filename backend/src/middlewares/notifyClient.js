import { ConnectedClientsModel, PictureModel, UserModel } from "../models";
import logger from "../common/logger";
import { socket } from "../";

export const notifyClient = async (req, res) => {
  const userId = req.params.userId;
  notifyClientHelper(userId);
};

export const notifyClientHelper = async userId => {
  try {
    const connectedClientsModel = await ConnectedClientsModel.findOne({
      userId: userId
    });
    if (connectedClientsModel !== null) {
      const connectedInstances = connectedClientsModel.connectedInstances;
      const notifications = await findNotifications(userId);
      for (let socketId of connectedInstances) {
        socket.of("/").connected[socketId].emit("notification", notifications);
      }
    } else {
      logger.info("the client is not connected right now or unreachable");
    }
  } catch (error) {
    logger.error(`unnable to notify the client(s): ${error}`);
  }
};

const findNotifications = async userId => {
  const pictureModels = await PictureModel.find({ userId });
  const notificationsResponse = {
    totalEntries: 0,
    totalPages: 1,
    totalUnreads: 0,
    items: []
  };
  for (let pictureModel of pictureModels) {
    const pictureId = pictureModel._id;
    const reactions = pictureModel.reactions;
    const comments = pictureModel.comments;

    await formatReactions(reactions, pictureId, notificationsResponse);
    await formatComments(comments, pictureId, notificationsResponse);
  }
  return notificationsResponse;
};

const formatReactions = async (reactions, pictureId, notificationsResponse) => {
  for (let reaction of reactions) {
    const authorId = reaction.author;
    const pictureUrlAuthor = await UserModel.findOne({ id: authorId })
      .pictureUrl;
    const createdDate = reaction.createdDate;
    const type = "reaction";
    const read = reaction.read;
    const id = reaction._id;

    const reactionNotification = createNotification(
      id,
      pictureId,
      pictureUrlAuthor,
      authorId,
      createdDate,
      type,
      read
    );
    notificationsResponse.items.push(reactionNotification);
    const count = read ? 0 : 1;
    notificationsResponse.totalUnreads += count;
    notificationsResponse.totalEntries += 1;
  }
};

const formatComments = async (comments, pictureId, notificationsResponse) => {
  for (let comment of comments) {
    const authorId = comment.author;
    const pictureUrlAuthor = await UserModel.findOne({ id: authorId })
      .pictureUrl;

    const createdDate = comment.createdDate;
    const type = "comment";
    const read = comment.read;
    const id = comment._id;

    const commentNotification = createNotification(
      id,
      pictureId,
      pictureUrlAuthor,
      authorId,
      createdDate,
      type,
      read
    );

    notificationsResponse.items.push(commentNotification);
    const count = read ? 0 : 1;
    notificationsResponse.totalUnreads += count;
    notificationsResponse.totalEntries += 1;
  }
};

const createNotification = (
  id,
  pictureId,
  pictureUrlAuthor,
  authorId,
  createdDate,
  type,
  read
) => {
  return {
    id: id,
    pictureId: pictureId,
    pictureUrlAuthor: pictureUrlAuthor,
    authorId: authorId,
    createdDate: createdDate,
    type: type,
    read: read
  };
};
