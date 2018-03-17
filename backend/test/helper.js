import {} from "dotenv/config";
import { app } from "../src/index";
import { mongoose } from "../src/common/mongoose";
import request from "supertest";

before(() => {
  global.app = app;
  dropDatabase();
});

after(() => {
  dropDatabase();
  delete global.app;
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
  await request(app)
    .post("/signup")
    .send({
      email: "gab@hotmail.com",
      firstName: "gab",
      lastName: "legault",
      id: "Gabswim"
    });
  await request(app)
    .post("/signup")
    .send({
      email: "gab2@hotmail.com",
      firstName: "gab2",
      lastName: "legault2",
      id: "Gabswim2"
    });
};

export { createUsers };
