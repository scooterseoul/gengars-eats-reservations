const formatReservation = require("./formatReservation");

const idFromMongoose = {
  _id: "507f1f77bcf86cd799439011",
  partySize: 4,
  date: "2023-11-17T06:30:00.000Z",
  userId: "614abe145f317b89a2e36883",
  restaurantName: "Lilac Grill",
};

describe("formatReservation", () => {
  it("should be change _id to id", () => {
    const expected = {
      id: "507f1f77bcf86cd799439011",
      partySize: 4,
      date: "2023-11-17T06:30:00.000Z",
      userId: "614abe145f317b89a2e36883",
      restaurantName: "Lilac Grill",
    };
    const result = formatReservation(idFromMongoose);
    expect(result).toEqual(expected);
  });
});
