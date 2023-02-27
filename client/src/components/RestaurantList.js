import React, { useState, useEffect } from "react";
import "./RestaurantList.css";
import { Link } from "react-router-dom";
// import "./ReserveNowButton.css";
import delicious from "../delicious.png";
import leftbanner from "../leftbanner.png";

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
      <div className="topcont">
        <div className="leftbannercont">
          <img src={leftbanner} alt="" className="leftbanner"></img>
        </div>
        <div className="deliciousbanner">
          <img src={delicious} alt="" className="delicious"></img>
        </div>
      </div>
      <h1 className="restaurantLabel">Recommended Eats...</h1>
      <ul className="restaurantListContainer">
        {restaurants.map((restaurant) => {
          return (
            <li className="singleRestaurant" key={restaurant.id}>
              <Link to={"/restaurants/" + restaurant.id}>
                <img src={restaurant.image} alt={restaurant.name} />
              </Link>

              <div className="restaurant-info">
                <div className="discount">{restaurant.discount}</div>
                <div className="rating">{restaurant.rating}</div>
                <div className="listRestaurantName">
                  <strong className="restoname">{restaurant.name}</strong>
                </div>
                <div className="cuisine">{restaurant.cuisine}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RestaurantList;
