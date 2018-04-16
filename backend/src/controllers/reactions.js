import { UserModel, PictureModel } from "../models";
import { errorMessage } from "../services";
import logger from "../common/logger";

const likeOrUnlike = async (req, res, next) => {
  try {
    let response = {};
    const pictureId = req.params.pictureId;
    const author = await findAuthor(req);

    let pictureModel = await PictureModel.findOne({
      _id: pictureId,
      "reactions.author": author
    });

    if (pictureModel === null) {
      pictureModel = await likePhoto(pictureId, author);
      response = pictureModel.reactions.pop();
    } else {
      pictureModel = await unlikePhoto(pictureId, author);
    }

    res.status(201).send(response);
  } catch (error) {
    errorMessage(res, 500, "Internal server error");
  }

  return next();
};

const likePhoto = async (pictureId, author) => {
  return await PictureModel.findOneAndUpdate(
    { _id: pictureId },
    { $push: { reactions: { author: author } } },
    { new: true }
  );
};

const unlikePhoto = async (pictureId, author) => {
  return await PictureModel.findOneAndUpdate(
    { _id: pictureId },
    { $pull: { reactions: { author: author } } },
    { new: true }
  );
};

const findAuthor = async req => {
  let accessToken = retrieveToken(req);
  let author;
  accessToken = accessToken.replace("Bearer ", "");

  const userModel = await UserModel.findOne({ accessToken: accessToken });
  author = userModel.id;

  return author;
};

const retrieveToken = req => {
  return req.headers["authorization"];
};

export { likeOrUnlike };
