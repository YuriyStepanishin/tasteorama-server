//server.js

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });

  } catch (error) {
    console.error("Mongo error:", error);
    process.exit(1);
  }
};

startServer();
