const validId = require("./validId");

describe("validId", () => {
  it("should return true if the id is valid", () => {
    const objectId = "614d4e4a68036a1c7cd77ea6";
    const received = validId(objectId);
    expect(received).toEqual(true);
  });

  it("should return false if the id is invalid", () => {
    const objectId = "invalid-id";
    const received = validId(objectId);
    expect(received).toEqual(false);
  });
});
