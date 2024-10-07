// routes/likeRoutes.js
import express from "express";
import { likeBook, dislikeBook, getLikedBooks } from "../controllers/like.js";

const router = express.Router();

// POST request to like a book
router.post("/", likeBook);

// DELETE request to dislike a book
router.delete("/:userId/:bookId", dislikeBook);

// GET request to get all liked books for a user
router.get("/:userId", getLikedBooks);

export default router;