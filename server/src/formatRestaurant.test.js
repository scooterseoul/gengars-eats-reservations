const formatRestaurant = require("./formatRestaurant");

const idFromMongoose = {
  _id: "616005cae3c8e880c13dc0b9",
  name: "Curry Place",
  description:
    "Bringing you the spirits of India in the form of best authentic grandma’s recipe dishes handcrafted with love by our chefs!",
  image: "https://placekitten.com/500/500",
};
describe("formatRestaurant", () => {
  it("should change _id to id", () => {
    const expected = {
      id: "616005cae3c8e880c13dc0b9",
      name: "Curry Place",
      description:
        "Bringing you the spirits of India in the form of best authentic grandma’s recipe dishes handcrafted with love by our chefs!",
      image: "https://placekitten.com/500/500",
    };
    const result = formatRestaurant(idFromMongoose);
    expect(result).toEqual(expected);
  });
});
