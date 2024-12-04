import supertest from "supertest";
import { app } from "../index";

describe("Messages", () => {
  describe("GET /messages", () => {
    describe("given the message doesnt exist", () => {
      it("Should return 404 NOT FOUND", async () => {
        const messageId = "60f7b1b4f3b3f3b3b3b3b3b0";
        await supertest(app).get(`/api/v1/messages/${messageId}`).expect(404);
      });

      //
    });
  });
});
