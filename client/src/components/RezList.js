import "./RezList.css";
import { formatDate } from "../utils/formatDate";

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Rez";

import { useAuth0 } from "@auth0/auth0-react";

const ReservationList = () => {
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/reservations`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setReservations(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id, getAccessTokenSilently]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  /* Added heading */
  if (reservations.length < 1) {
    return (
      <>
        <h1 className="upcoming">Upcoming reservations</h1>
        <p className="no-reservations">You don't have any reservations.</p>
        <div className="linkToInfo">
          <Link to="/">View the restaurants</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="upcoming">Upcoming reservations</h1>
      <div className="upContainer">
        <ul className="reservations-list">
          {reservations.map((reservation) => {
            return (
              <li key={reservation.id}>
                <p className="upcomingRestaurantName">
                  <strong>{reservation.restaurantName}</strong>
                </p>

                <p className="formatDate"> {formatDate(reservation.date)}</p>

                <div className="linkToInfo">
                  <Link to={"/reservations/" + reservation.id}>
                    View details &rarr;
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ReservationList;
