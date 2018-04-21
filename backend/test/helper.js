import {} from "dotenv/config";
import { server } from "../src/index";
import { mongoose } from "../src/common/mongoose";
import request from "supertest";

before(() => {
  global.server = server;
  dropDatabase();
});

after(() => {
  dropDatabase();
  delete global.server;
});

beforeEach(() => {
  dropDatabase();
});

const dropDatabase = () => {
  mongoose.connection.on("connected", () => {
    mongoose.connection.db.dropDatabase();
  });
};

const createUsers = async () => {
  await request(server)
    .post("/signup")
    .send({
      email: "gab@hotmail.com",
      firstName: "gab",
      lastName: "legault",
      id: "Gabswim"
    });
  await request(server)
    .post("/signup")
    .send({
      email: "gab2@hotmail.com",
      firstName: "gab2",
      lastName: "legault2",
      id: "Gabswim2"
    });
};

export { createUsers };
