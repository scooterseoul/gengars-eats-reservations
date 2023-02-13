import React, { useState, useEffect } from "react";
import "./RestoList.css";
import { Link } from "react-router-dom";
// import "./ReserveNowButton.css";

const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/restaurants`
      );
      const data = await response.json();
      setRestaurants(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className="restaurantLabel">Restaurants</h1>
      <ul className="restaurantListContainer">
        {restaurants.map((restaurant) => {
          return (
            <li className="singleRestaurant" key={restaurant.id}>
              <img src={restaurant.image} alt={restaurant.name} />

              <div className="restaurant-info">
                <p className="listRestaurantName">
                  <strong>{restaurant.name}</strong>
                </p>
                <p className="description">{restaurant.description}</p>
              </div>
              <Link to={"/restaurants/" + restaurant.id} className="btn">
                Reserve now &rarr;
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RestaurantList;
