import express from "express";
const app = express();4
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import bookRouter from "./routes/book.js";
import userRouter from "./routes/user.js";
import cartRouter from "./routes/cart.js";
import likeRouter  from "./routes/like.js";
import mailServiceRouter from './routes/mail.js'


dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

const mongoURI =`${process.env.MONGO_URI}`;

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
app.use("/cart", cartRouter);
app.use("/like", likeRouter);
app.use("/mail",mailServiceRouter);


// Basic route
app.get("/", (req, res) => {
  res.send("Hello Saumya!");
});

// Start server
app.listen(4000, () => {
  console.log(`App listening on port 4000`);
});
