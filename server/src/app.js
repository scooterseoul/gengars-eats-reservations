const express = require("express");
const cors = require("cors");
const app = express();
const validId = require("./utils/validId");
const RestaurantModel = require("./models/RestoModel");
const formatRestaurant = require("./formatResto");
const { celebrate, Joi, errors } = require("celebrate");
const { Segments } = require("celebrate");
const ReservationModel = require("./models/RezModel");
const formatReservation = require("./formatRez");

const { auth } = require("express-oauth2-jwt-bearer");
const checkJwt = auth({
  audience: "https://resto-couscous/",
  issuerBaseURL: `https://dev-71zodzc5.us.auth0.com/`,
});

app.use(cors());
app.use(express.json());

app.get("/restaurants", async (request, response) => {
  const restaurants = await RestaurantModel.find({});
  return response.status(200).send(restaurants.map(formatRestaurant));
});
app.get("/restaurants/:id", async (request, response) => {
  const { id } = request.params;
  const isIdValid = validId(id);
  if (isIdValid) {
    const restaurant = await RestaurantModel.findById(id);
    if (restaurant) {
      return response.status(200).send(formatRestaurant(restaurant));
    } else {
      return response.status(404).send({
        message: "The restaurant trying to be retrieved does not exist",
      });
    }
  } else {
    return response.status(400).send({ message: "Invalid ID is provided" });
  }
});

app.get("/reservations", checkJwt, async (request, response) => {
  const { auth } = request;

  const reservations = await ReservationModel.find({
    userId: auth.payload.sub,
  });
  const formattedReservations = reservations.map(formatReservation);
  response.send(formattedReservations).status(200);
});

app.get("/reservations/:id", checkJwt, async (request, response) => {
  const { id } = request.params;
  const { auth } = request;
  const userId = auth.payload.sub;

  const isIdValid = validId(id);

  if (isIdValid) {
    const reservation = await ReservationModel.findById(id);

    if (reservation) {
      if (reservation.userId === userId) {
        return response.send(formatReservation(reservation));
      } else {
        return response.status(403).send({
          error: "user does not have permission to access this reservation",
        });
      }
    } else {
      return response.status(404).send({
        error: "not found",
      });
    }
  } else {
    return response.status(400).send({ error: "invalid id provided" });
  }
});

app.post(
  "/reservations",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      partySize: Joi.number().min(1).required(),
      date: Joi.string().required(),
      restaurantName: Joi.string().required(),
      userId: Joi.string().required(),
    }),
  }),
  async (request, response, next) => {
    try {
      const { body } = request;
      const reservation = new ReservationModel(body);
      await reservation.save();
      return response.status(201).send(formatReservation(reservation));
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);
app.use(errors());
module.exports = app;
