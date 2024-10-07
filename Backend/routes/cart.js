import express from "express";
import { addBookToCart, deleteAllBooksFromCart, deleteBookFromCart, getBooksFromCart } from "../controllers/cart.js";
import {requireSignin} from "../common-middleware/index.js"

const router = express.Router();





router.post("/add", addBookToCart);
router.delete("/delete", deleteBookFromCart);
router.delete("/deleteAll", deleteAllBooksFromCart);
router.get("/getCartItems", requireSignin, getBooksFromCart);

export default router;
