const request = require("supertest");

const app = require("./app");

/*Added 200*/
describe("app", () => {
  test("GET /restaurants returns a list of restaurants with 200", async () => {
    const expectedStatus = 200;
    const expectedBody = [
      {
        id: "616005cae3c8e880c13dc0b9",
        name: "The Flowering Taj",
        description:
          "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
        image:
          "https://img.freepik.com/free-photo/indian-food-assortment-with-sari-top-view_23-2148747630.jpg?w=826&t=st=1675737287~exp=1675737887~hmac=632ac9e9b63bde3e21a33d10f2d8478c00d8b7c4b94b24e4446ae3edb7dec0ad",
      },
      {
        id: "616005e26d59890f8f1e619b",
        name: "Kho Samui Thai",
        description:
          "Kho Samui Thai is pleased to offer a taste of authentic Thai food, where quality is never compromised. Using the freshest ingredients, each dish is prepared individually with herbs and spices to ensure wonderful bold and genuine flavors.",
        image:
          "https://cdn.pixabay.com/photo/2016/10/25/13/28/papaya-salad-1768888_960_720.jpg",
      },
      {
        id: "616bd284bae351bc447ace5b",
        name: "Little Sicily",
        description:
          "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
        image:
          "https://cdn.pixabay.com/photo/2020/06/02/18/10/noodles-5252012__340.jpg",
      },
    ];

    await request(app)
      .get("/restaurants")
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expectedBody);
      });
  });
  /* Added 200 */
  test("GET /restaurants/:id for single restaurant with 200", async () => {
    await request(app)
      .get("/restaurants/616005cae3c8e880c13dc0b9")
      .expect((response) => {
        const expected = {
          id: "616005cae3c8e880c13dc0b9",
          name: "The Flowering Taj",
          description:
            "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
          image:
            "https://img.freepik.com/free-photo/indian-food-assortment-with-sari-top-view_23-2148747630.jpg?w=826&t=st=1675737287~exp=1675737887~hmac=632ac9e9b63bde3e21a33d10f2d8478c00d8b7c4b94b24e4446ae3edb7dec0ad",
        };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(200);
      });
  });
  test("if GET /restaurants/:id invalid, should return msg Invalid ID with a 400 response", async () => {
    await request(app)
      .get("/restaurants/bad-id")
      .expect((response) => {
        const expected = { error: "invalid id provided" };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(400);
      });
  });
  test("if GET /restaurants/:id not found should return 404", async () => {
    await request(app)
      .get("/restaurants/616005cae3c8e880c13dc0b4")
      .expect((response) => {
        const expected = {
          error: "restaurant not found",
        };
        expect(response.body).toEqual(expected);
        expect(response.status).toEqual(404);
      });
  });
  /* Added 200 */
  test("should return MY reservations from GET /reservations with 200", async () => {
    await request(app)
      .get("/reservations")
      .expect((response) => {
        const expected = [
          {
            id: "507f1f77bcf86cd799439011",
            partySize: 4,
            date: "2023-11-17T06:30:00.000Z",
            restaurantName: "Lilac Grill",
            userId: "mock-user-id",
          },
          {
            id: "614abf0a93e8e80ace792ac6",
            partySize: 2,
            date: "2023-12-03T07:00:00.000Z",
            restaurantName: "The Flowering Taj",
            userId: "mock-user-id",
          },
        ];
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(200);
      });
  });
  /* Added 200 */
  test("should GET /reservations/:id for single reservation with 200", async () => {
    await request(app)
      .get("/reservations/507f1f77bcf86cd799439011")
      .expect((response) => {
        const expected = {
          id: "507f1f77bcf86cd799439011",
          partySize: 4,
          date: "2023-11-17T06:30:00.000Z",
          restaurantName: "Lilac Grill",
          userId: "mock-user-id",
        };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(200);
      });
  });

  test("should forbid access to other users at GET/reservations/:id and return 403", async () => {
    await request(app)
      .get("/reservations/61679189b54f48aa6599a7fd")
      .expect((response) => {
        const expected = {
          error: "user does not have permission to access this reservation",
        };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(403);
      });
  });

  test("if GET /reservations/:id invalid, should return msg Invalid ID with a 400 response", async () => {
    await request(app)
      .get("/reservations/bad-id")
      .expect((response) => {
        const expected = { error: "invalid id provided" };
        expect(response.body).toEqual(expected);
        expect(response.status).toBe(400);
      });
  });
  test("GET /reservations/:id returns 404 when you supply an id that does not exist in the database", async () => {
    const expectedStatus = 404;

    await request(app)
      .get("/reservations/007f1f77bcf86cd799439011")
      .expect(expectedStatus);
  });
  /* Added 201 */
  test("POST /reservations creates a new reservation with 201", async () => {
    const expectedStatus = 201;
    const body = {
      partySize: 2,
      date: "2023-11-17T06:30:00.000Z",
      restaurantName: "The Flowering Taj",
    };

    await request(app)
      .post("/reservations")
      .send(body)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expect.objectContaining(body));
        expect(response.body.id).toBeTruthy();
      });
  });

  test("POST /reservations returns a 400 when an invalid request body is provided", async () => {
    const expectedStatus = 400;
    const body = {
      partySize: 2,
      date: "2023-11-17T06:30:00.000Z",
      restaurantName: 1,
    };

    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });
});
