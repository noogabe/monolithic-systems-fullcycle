import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for client", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const response = await request(app).post("/clients").send({
      id: "1",
      name: "Gabriele Almeida",
      email: "gabriele.almeida@email.com",
      document: "123456",
      street: "some street",
      number: "12",
      complement: "some complement",
      city: "some city",
      state: "some state",
      zipCode: "12345"
    });

    expect(response.status).toEqual(201);
  });

  it("should not create a client when name is not provided", async () => {
    const response = await request(app).post("/clients").send({
      id: "1",
      email: "gabriele.almeida@email.com",
      document: "123456",
      street: "some street",
      number: "12",
      complement: "some complement",
      city: "some city",
      state: "some state",
      zipCode: "12345"
    });

    expect(response.status).toEqual(400);
  });
});