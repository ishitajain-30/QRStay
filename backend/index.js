import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import usersRoutes from "./routes/usersRoutes.js";
import hotelsRoutes from "./routes/hotelsRoutes.js";
import bookingsRoutes from "./routes/bookingsRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB database connected");
  } catch (error) {
    console.log("Mongodb database connection failed");
  }
};

app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET"],
    // credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello Guest");
});

app.use("/users", usersRoutes);
app.use("/hotels", hotelsRoutes);
app.use("/bookings", bookingsRoutes);

app.listen(port, () => {
  connectToDB();
  console.log("Server is listening");
});
