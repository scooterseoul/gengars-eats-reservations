const formatReservation = (reservation) => {
  return {
    id: reservation._id,
    partySize: reservation.partySize,
    date: reservation.date,
    userId: reservation.userId,
    restaurantName: reservation.restaurantName,
    address: reservation.address,
    userId: reservation.userId,
  };
};

module.exports = formatReservation;
