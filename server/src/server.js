const mongoose = require("mongoose");

const port = process.env.PORT || 5001;
const app = require("./app");

const mongoDbUri = process.env.MONGO_URI || "mongodb://localhost:27017/mongo";
mongoose.connect(mongoDbUri, {
  dbName: process.env.DB_Name,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
});

app.listen(port, () => {
  console.log(`API server started at ${port}`);
});
