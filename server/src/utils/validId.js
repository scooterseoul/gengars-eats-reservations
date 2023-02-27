const mongoose = require("mongoose");

const validId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

module.exports = validId;
