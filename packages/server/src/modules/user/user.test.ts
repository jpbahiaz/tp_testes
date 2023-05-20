import { describe, expect, it } from "vitest";
import { isUser } from "./repository/createUser";

describe("UserModule", () => {
  it("isUser should return if object is user", () => {
    expect(isUser({ name: "Zica", email: "zica@zica.com" })).toBeTruthy();
  });
});
