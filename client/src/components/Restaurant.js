import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CreateReservation from "./CreateReservation";
import "./Restaurant.css";

const Restaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = await fetch(
        `${process.env.REACT_APP_API_URL}/restaurants/${id}`
      );

      if (fetchUrl.ok === false) {
        setIsNotFound(true);
        return;
      }
      const data = await fetchUrl.json();
      setRestaurant(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id]);

  if (isNotFound) {
    return (
      <>
        <p className="error">Sorry! We can't find that restaurant.</p>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul className="singlecontainer">
        <li key={restaurant.id} className="image">
          <p className="restaurantName">
            <strong>{restaurant.name}</strong>
          </p>
          <img
            className="singleimage"
            src={restaurant.image}
            alt={restaurant.name}
          />
        </li>
        <div className="restcont">
          <p className="address">
            <strong>Address - </strong>
            {restaurant.address}
          </p>
          <p className="restophone">
            <strong>Phone - </strong>
            {restaurant.phone}
          </p>
          <p className="description">
            <strong>Overview - </strong>
            {restaurant.description}
          </p>
        </div>
        <div className="createrez">
          <CreateReservation restaurantName={restaurant.name} />
        </div>
      </ul>
    </>
  );
};

export default Restaurant;
