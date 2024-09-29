import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import bookRouter from "./routes/book.js";
import userRouter from "./routes/user.js";

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const mongoURI =
  "mongodb+srv://saumyasingh98982:YUVzVqOuwX01avVe@bookstore.kaf3b.mongodb.net/?retryWrites=true&w=majority&appName=BookStore";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Database connected!!");
  })
  .catch((error) => {
    console.log("Error connecting to the database:");
    console.error(error);
  });

//defining routes
app.use("/book", bookRouter);
app.use("/user", userRouter);

// Basic route
app.get("/", (req, res) => {
  res.send("Hello Saumya!");
});

// Start server
app.listen(4000, () => {
  console.log(`App listening on port 4000`);
});
