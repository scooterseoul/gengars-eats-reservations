const formatRestaurant = (restaurant) => {
  return {
    id: restaurant._id,
    name: restaurant.name,
    cuisine: restaurant.cuisine,
    discount: restaurant.discount,
    address: restaurant.address,
    phone: restaurant.phone,
    rating: restaurant.rating,
    description: restaurant.description,
    image: restaurant.image,
  };
};

module.exports = formatRestaurant;
