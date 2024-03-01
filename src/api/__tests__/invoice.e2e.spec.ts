import { app, sequelize } from "../express";
import request from "supertest";

import Id from "../../modules/@shared/domain/value-object/id.value-object";
import { Address } from "../../modules/invoice/domain/address.value-object";
import { InvoiceItems } from "../../modules/invoice/domain/invoice-items";
import { Invoice } from "../../modules/invoice/domain/invoice";
import { InvoiceRepository } from "../../modules/invoice/repository/invoice.repository";

describe("E2E test for invoice", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should do the invoice", async () => {
    const address = new Address({
      street: "Rua Julio Cesar",
      number: "123",
      complement: "Casa de esquina",
      city: "Fortaleza",
      state: "Ceara",
      zipCode: "122343404",
    });

    const item1 = new InvoiceItems({
      id: new Id("1"),
      name: "Notebook",
      price: 100,
    });

    const item2 = new InvoiceItems({
      id: new Id("2"),
      name: "Desktop",
      price: 200,
    });

    const invoice = new Invoice({
      id: new Id("123"),
      name: "Invoice teste",
      document: "Document teste",
      items: [item1, item2],
      address: address,
    });

    const invoiceRepository = new InvoiceRepository();

    await invoiceRepository.add(invoice);
    const response = await request(app).get(`/invoice/${123}`);

    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual("Invoice teste");
  });
});