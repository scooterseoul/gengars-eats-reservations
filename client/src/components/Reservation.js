import { Link, useParams } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import "./Reservation.css";
import React, { useState, useEffect } from "react";
import Empty from "../empty.png";
import { useAuth0 } from "@auth0/auth0-react";

const Reservation = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isNotFound, setIsNotFound] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const fetchUrl = await fetch(
        `${process.env.REACT_APP_API_URL}/reservations/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (fetchUrl.ok === false) {
        setIsNotFound(true);
        return;
      }
      const data = await fetchUrl.json();
      setReservation(data);
      setIsLoading(false);
    };
    fetchData();
  }, [id, getAccessTokenSilently]);

  if (isNotFound) {
    return (
      <>
        <p className="resError">Sorry! No reservation found.</p>
        <div className="emptyrez">
          <img className="empty" alt="empty" src={Empty}></img>
        </div>
        <div className="backtorez">
          <Link to="/reservations/" className="backToList">
            &laquo; Back to reservations
          </Link>
        </div>
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <ul className="contRez">
        <li className="details">
          <p className="singleRezRestName">
            <strong>{reservation.restaurantName}</strong>
          </p>
          <p>
            <span className="rezinfo"> {formatDate(reservation.date)}</span>
          </p>
          <p>
            <span className="partysize">
              <strong>Party size: </strong>
            </span>
            {reservation.partySize}
          </p>
        </li>
      </ul>
      <div className="backTo">
        <Link to="/reservations/" className="btn-back">
          &laquo; Back
        </Link>
      </div>
    </>
  );
};

export default Reservation;
