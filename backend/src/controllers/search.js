import logger from "../common/logger";
import { errorMessage } from "./errorMessageHelper";
import { UserModel } from "../models/user";
import { PictureModel } from "../models/picture";
import { parseEntry } from "../services";

const search = async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;
  //TODO add the limit in the query & parseEntry(data);
  const query = req.query.q || null;

  if (query == null) {
    errorMessage(res, 400, "Missing parameter");
  }

  let response = {
    mentions: { items: [], totalPages: 1, totalEntries: 0 },
    users: { items: [], totalPages: 1, totalEntries: 0 },
    pictures: { items: [], totalPages: 1, totalEntries: 0 }
  };
  try {
    const users = await queryUsers(query, limit);
    const pictures = await queryPictures(query, limit);
    const mentions = await queryMentions(query, limit);

    response.users.items.push(users);
    response.pictures.items.push(pictures);
    response.mentions.items.push(pictures);

    const usersTotalEntries = users.length;
    response.users.totalEntries = usersTotalEntries;
  
    const picturesTotalEntries = pictures.length;
    response.pictures.totalEntries = picturesTotalEntries;

    const mentionsTotalEntries = mentions.length;
    response.mentions.totalEntries = mentionsTotalEntries;
    
  } catch (error) {
    errorMessage(res, 500, "Internal server error");
  }

  res.status(200).send(response);
};

const queryUsers = async (query, limit) => {
  let data = await UserModel.find({
    $or: [{ firstName: query }, { lastName: query }, { id: query }]
  })
    .limit(limit)
    .exec();
  console.log("data users:");
  console.log(data);
  data = data.map(parseEntry);
  return data;
};

const queryPictures = async (query, limit) => {
  console.log(query);
  let data = await PictureModel.find({ $text: { $search: query } })
    .limit(limit)
    .exec();
  console.log("data pictures:");
  console.log(data);
  console.log("after");
  data = data.map(parseEntry);

  return data;
};

const queryMentions = async (query, limit) => {
  let data = await PictureModel.find({
    mentions: query
  })
    .limit(limit)
    .exec();
  console.log("data mentions:");
  console.log(data);

  data = data.map(parseEntry);

  return data;
};

export { search };
