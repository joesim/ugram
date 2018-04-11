import { PictureModel } from "../models/picture";
import { errorMessage } from "../services";

const create = async (req, res) => {
  try {
    const userId = req.params.userId;
    const pictureId = req.params.pictureId;
    const author = req.body.author;

    const pictureModel = await PictureModel.findOneAndUpdate(
      { _id: pictureId, userId: userId },
      { $push: { reactions: { author: author } } },
      { new: true }
    );

    const response = pictureModel.reactions.pop();
    res.status(201).send(response);
  } catch (error) {
    errorMessage(res, 500, "Internal server error");
  }
};

const deleteOne = (req, res) => {};

export { create, deleteOne };
