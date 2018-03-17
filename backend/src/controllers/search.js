import { errorMessage } from "./errorMessageHelper";
import { UserModel } from "../models/user";
import { PictureModel } from "../models/picture";
import { parseEntry } from "../services";

const search = async (req, res) => {
  const limit = parseInt(req.query.limit) || 3;
  const query = req.query.q || null;
  const usersOnly = req.query.usersOnly === "true" || false;
  const picturesOnly = req.query.picturesOnly === "true" || false;
  const mentionsOnly = req.query.mentionsOnly === "true" || false;
  console.log('ici')
  const options = {
    usersOnly: usersOnly,
    picturesOnly: picturesOnly,
    mentionsOnly: mentionsOnly
  };
  console.log('ici')
  validateQueryOptionalQuery(options, query, res);
  
  let response;
  try {
    const users = await queryUsers(query, limit);
    const pictures = await queryPictures(query, limit);
    const mentions = await queryMentions(query, limit);

    response = responseBuilder(users, pictures, mentions, options);
  } catch (error) {
    errorMessage(res, 500, "Internal server error");
  }

  res.status(200).send(response);
};

const validateQueryOptionalQuery = (options, query, res) => {
  if (query == null) {
    errorMessage(res, 400, "Missing parameter q");
  }

  if (
    !(
      options.usersOnly ^
      options.picturesOnly ^
      options.mentionsOnly ^
      (options.usersOnly && options.picturesOnly && options.mentionsOnly)
    )
  ) {
    if (options.usersOnly || options.picturesOnly || options.mentionsOnly) {
      errorMessage(
        res,
        400,
        "Only one option between [usersOnly, picturesOnly, mentionsOnly] is allowed "
      );
    }
  }
};

const responseBuilder = (users, pictures, mentions, options) => {
  let response = {
    mentions: { items: [], totalPages: 1, totalEntries: 0 },
    users: { items: [], totalPages: 1, totalEntries: 0 },
    pictures: { items: [], totalPages: 1, totalEntries: 0 }
  };

  response.users.items = users;
  response.pictures.items = pictures;
  response.mentions.items = mentions;

  const usersTotalEntries = users.length;
  const picturesTotalEntries = pictures.length;
  const mentionsTotalEntries = mentions.length;

  response.users.totalEntries = usersTotalEntries;
  response.pictures.totalEntries = picturesTotalEntries;
  response.mentions.totalEntries = mentionsTotalEntries;

  if (options.usersOnly) {
    response = response.users;
  } else if (options.picturesOnly) {
    response = response.pictures;
  } else if (options.mentionsOnly) {
    response = response.mentions;
  }

  return response;
};

const queryUsers = async (query, limit) => {
  let data = await UserModel.find({
    $or: [{ firstName: query }, { lastName: query }, { id: query }]
  })
    .limit(limit)
    .exec();
  data = data.map(parseEntry);
  return data;
};

const queryPictures = async (query, limit) => {
  let data = await PictureModel.find({ $text: { $search: query } })
    .limit(limit)
    .exec();
  data = data.map(parseEntry);

  return data;
};

const queryMentions = async (query, limit) => {
  let data = await PictureModel.find({
    mentions: query
  })
    .limit(limit)
    .exec();
  data = data.map(parseEntry);

  return data;
};

export { search };
