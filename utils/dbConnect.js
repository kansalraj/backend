const mongoose = require("mongoose");
require("dotenv").config();

// const DB_URL = 'mongodb://0.0.0.0:27017/my-wallet-db';
// const DB_URL = "mongodb+srv://AnkitKansalWalletApp:QDx8tmZRV9VT9Lz1@cluster0.3zlh5uy.mongodb.net/"

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
