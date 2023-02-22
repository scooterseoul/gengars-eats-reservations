import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./CreateReservation.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateReservation = ({ restaurantName }) => {
  const [partySize, setPartySize] = useState("");
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorStatus, setErrorStatus] = useState("");

  const navigate = useNavigate();

  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = await getAccessTokenSilently();
    setIsLoading(true);

    const body = { date, restaurantName, partySize };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/reservations`,

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      setIsError(true);
      setErrorStatus(response.status);
    } else {
      setIsLoading(false);
      navigate("/reservations");
    }
  };
  if (isError) {
    return (
      <>
        <p className="no-reservations">
          Error creating a reservation! (error status {errorStatus})
        </p>
        <Link to="/" className="button">
          Return to reservations
        </Link>
      </>
    );
  }

  return (
    <>
      <div className="createContainer">
        <h1>Reserve {restaurantName}</h1>
        <form onSubmit={handleSubmit}>
          <p className="forminput">
            <label htmlFor="partySize">Number of Guests </label>
            <br></br>
            <input
              type="number"
              min="1"
              placeholder="min 1"
              id="partySize1"
              value={partySize}
              onChange={(event) => {
                setPartySize(event.target.value);
              }}
              required
            />
          </p>
          <br></br>
          <label htmlFor="datetime">Date</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={new Date()}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            required
            /*Added time*/
            dateFormat="d/MM/yyyy h:mm aa"
          />

          <button className="submit-btn" disabled={isLoading}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateReservation;
