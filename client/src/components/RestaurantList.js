import React, { useState, useEffect } from "react";
import "./RestaurantList.css";
import { Link } from "react-router-dom";
import kohSamui from "../images/kohSamui.png";
import locationMarker from "../images/icons8-location-30.png";
import phoneIcon from "../images/icons8-phone-30.png";
import map from "../images/icons8-map-48.png";
import SideBar from "./SideBar";
import pots from "../images/potspic.png";
import salad from "../images/saladpic.png";
import vegies from "../images/vegiespic.png";

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
      <div className="listCont">
        <div className="sideBar1">
          <SideBar />
        </div>
        <div className="topcont">
          <p className="photoBy">Photo by Lum3n</p>

          <div className="updated">
            <strong>Last Updated:</strong> May 23, 2023
          </div>

          <div className="introCont">
            <div className="welcome">Welcome</div>
            <div className="intro">
              Whether you're seeking a romantic dinner, a lively gathering, or a
              casual brunch, Gengar's Eats is here to transform your dining
              aspirations into reality. Let us be your trusted companion on the
              journey to unforgettable flavors and extraordinary dining
              experiences. Welcome to Gengar's Eats, where culinary dreams come
              true.
            </div>
            <div className="photoGallery">
              <img src={pots} alt="restaurantPic" className="pots" />
              <img src={salad} alt="restaurantPic" className="salad" />
              <img src={vegies} alt="restaurantPic" className="vegies" />
            </div>
          </div>
          <div className="topPick">
            <p className="topPickHeading">
              This month's <strong>TOP PICK!</strong>
            </p>
            <p>
              <strong>Koh Samui</strong>
            </p>
            <img src={kohSamui} alt="koh samui" />
            <p className="pickDescription">
              At Koh Samui, the menu is a symphony of authentic Thai flavors.
              From the fragrant and tangy Tom Yum soup to the perfectly balanced
              Pad Thai, every bite is an explosion of taste. Indulge in tender
              and aromatic Green Curry, or savor the crispy goodness of Golden
              Spring Rolls. Each dish is crafted with meticulous attention to
              detail, showcasing the culinary expertise of our skilled chefs.
              Discover the magic of Thai cuisine at Koh Samui, where every dish
              tells a story and every bite is an adventure.
            </p>
            <div className="topDetails">
              <img
                src={locationMarker}
                alt="address"
                className="addressMarker"
              />
              <p className="address">227 1st Avenue, South Bayview</p>

              <img src={phoneIcon} alt="phone" className="phoneIcon" />
              <p className="phoneNumber">212-867-2000</p>
              <div className="map">
                <img src={map} alt="map" className="topMap" />
              </div>
            </div>
          </div>
          <div className="recommend">
            <h1 className="restaurantLabel">Recommended Eats</h1>
          </div>
        </div>

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
      </div>
    </>
  );
};

export default RestaurantList;
