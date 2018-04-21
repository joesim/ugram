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

    const formatedReactions = formatNotifications(
      pictureModel,
      reactions,
      "reaction",
      notificationsResponse
    );
    const formatedComments = formatNotifications(
      pictureModel,
      comments,
      "comment",
      notificationsResponse
    );
    await Promise.all([formatedReactions, formatedComments]);
  }
  return notificationsResponse;
};

const formatNotifications = async (
  pictureModel,
  notifications,
  notificationType,
  notificationsResponse
) => {
  const pictureId = pictureModel._id;
  const pictureUrl = pictureModel.url;

  for (let notification of notifications) {
    const id = notification._id;
    const authorId = notification.author;
    const pictureUrlAuthor = await getPictureUrlAuthor(authorId);
    const createdDate = notification.createdDate;
    const type = notificationType;
    const read = notification.read;

    const formatedNotification = createNotification(
      id,
      pictureId,
      pictureUrl,
      pictureUrlAuthor,
      authorId,
      createdDate,
      type,
      read
    );

    notificationsResponse.items.push(formatedNotification);
    const count = read ? 0 : 1;
    notificationsResponse.totalUnreads += count;
    notificationsResponse.totalEntries += 1;
  }
};

const getPictureUrlAuthor = async authorId => {
  const userModel = await UserModel.findOne({ id: authorId });
  const pictureUrlAuthor = userModel.pictureUrl;
  return pictureUrlAuthor;
};

const createNotification = (
  id,
  pictureId,
  pictureUrl,
  pictureUrlAuthor,
  authorId,
  createdDate,
  type,
  read
) => {
  return {
    id: id,
    pictureId: pictureId,
    pictureUrl: pictureUrl,
    pictureUrlAuthor: pictureUrlAuthor,
    authorId: authorId,
    createdDate: createdDate,
    type: type,
    read: read
  };
};
