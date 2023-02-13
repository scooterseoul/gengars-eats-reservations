const formatRestaurant = require("./formatRestaurant");

const idFromMongoose = {
  _id: "616005cae3c8e880c13dc0b9",
  name: "The Flowering Taj",
  description:
    "Bringing you the spirits of India in the form of best authentic grandma’s recipe dishes handcrafted with love by our chefs!",
  image:
    "https://img.freepik.com/free-photo/indian-food-assortment-with-sari-top-view_23-2148747630.jpg?w=826&t=st=1675737287~exp=1675737887~hmac=632ac9e9b63bde3e21a33d10f2d8478c00d8b7c4b94b24e4446ae3edb7dec0ad",
};
describe("formatRestaurant", () => {
  it("should change _id to id", () => {
    const expected = {
      id: "616005cae3c8e880c13dc0b9",
      name: "The Flowering Taj",
      description:
        "Bringing you the spirits of India in the form of best authentic grandma’s recipe dishes handcrafted with love by our chefs!",
      image:
        "https://img.freepik.com/free-photo/indian-food-assortment-with-sari-top-view_23-2148747630.jpg?w=826&t=st=1675737287~exp=1675737887~hmac=632ac9e9b63bde3e21a33d10f2d8478c00d8b7c4b94b24e4446ae3edb7dec0ad",
    };
    const result = formatRestaurant(idFromMongoose);
    expect(result).toEqual(expected);
  });
});
