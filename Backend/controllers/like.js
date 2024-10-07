


import Cart from  '../modals/cart.js';
import Book from "../modals/book.js";
import User from '../modals/user.js';

// Function to like a book
export const likeBook = async (req, res) => {
  const { userId, bookId } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);

    // Check if the book is already liked
    if (user.likedBooks.includes(bookId)) {
      return res.status(400).json({ message: "Book already liked" });
    }

    // Add the book to the likedBooks array
    user.likedBooks.push(bookId);
    await user.save();

    res.status(200).json({ message: "Book liked successfully" });
  } catch (error) {
    console.error("Error liking the book:", error);
    res.status(500).json({ message: "Failed to like the book" });
  }
};

// Function to dislike (unlike) a book
export const dislikeBook = async (req, res) => {
  const { userId, bookId } = req.params;

  try {
    // Find the user
    const user = await User.findById(userId);

    // Check if the book is liked
    if (!user.likedBooks.includes(bookId)) {
      return res.status(400).json({ message: "Book not liked" });
    }

    // Remove the book from the likedBooks array
    user.likedBooks = user.likedBooks.filter((id) => id.toString() !== bookId);
    await user.save();

    res.status(200).json({ message: "Book unliked successfully" });
  } catch (error) {
    console.error("Error disliking the book:", error);
    res.status(500).json({ message: "Failed to unlike the book" });
  }
};

// Function to get liked books for a user
export const getLikedBooks = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user and populate liked books
    const user = await User.findById(userId).populate("likedBooks");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ likedBooks: user.likedBooks });
  } catch (error) {
    console.error("Error getting liked books:", error);
    res.status(500).json({ message: "Failed to retrieve liked books" });
  }
};