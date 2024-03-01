import { app, sequelize } from "../express";
import request from "supertest";
import ClientModel from "../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../modules/product-adm/repository/product.model";

describe("E2E test for checkout", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should do the checkout", async () => {
    await ClientModel.create({
      id: "1",
      name: "noogabe",
      email: "noogabe@gmail.com",
      document: "4545",
      street: "Rua qualquer",
      number: "12",
      complement: "some complement",
      city: "some city",
      state: "some state",
      zipCode: "12345",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "1",
      name: "Notebook",
      description: "HP",
      purchasePrice: 200,
      salesPrice: 300,
      stock: 23,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: "2",
      name: "Desktop",
      description: "Dell",
      purchasePrice: 15,
      salesPrice: 35,
      stock: 16,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: [{ productId: "1" }, { productId: "2" }],
      });

    expect(response.status).toEqual(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.invoiceId).toBeDefined();
    expect(response.body.total).toEqual(335);
    expect(response.body.status).toEqual("approved");
  });
});