import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import CreateReservation from "./CreateRez";
import "./Resto.css";

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
      <ul>
        <li key={restaurant.id} className="image">
          <img src={restaurant.image} alt={restaurant.name} />

          <p className="restaurantName">
            <strong>{restaurant.name}</strong>
          </p>
          <p className="description">{restaurant.description}</p>
        </li>

        <CreateReservation restaurantName={restaurant.name} />
      </ul>
    </>
  );
};

export default Restaurant;
