import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: Number,
  category: String,
  booklink: String,
  image: String,
});
const Book = mongoose.model("Book", bookSchema);

export default Book;