import Cart from "../modals/cart.js";
import Book from "../modals/book.js";

// Add a book to the cart
export const addBookToCart = async (req, res) => {
  try {
    const { userId, bookId, quantity } = req.body;

    // Find the user's cart
    let cart = await Cart.findOne({ user: userId });

    // Find the book to add
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // If no cart exists for the user, create a new one
    if (!cart) {
      cart = new Cart({
        user: userId,
        books: [{ book: bookId, quantity: quantity || 1 }],
        totalPrice: book.price * (quantity || 1),
      });
      await cart.save();
      return res.status(201).json({
        message: "Book added to cart successfully",
        cart,
      });
    }

    // Check if the book is already in the cart
    const existingBookIndex = cart.books.findIndex(
      (item) => item.book.toString() === bookId
    );

    if (existingBookIndex > -1) {
      // If the book exists, update the quantity
      cart.books[existingBookIndex].quantity += quantity || 1;
    } else {
      // If the book does not exist in the cart, add it
      cart.books.push({ book: bookId, quantity: quantity || 1 });
    }

    // Recalculate the total price
    cart.totalPrice += book.price * (quantity || 1);

    // Save the updated cart
    await cart.save();

    res.status(200).json({
      message: "Book added to cart successfully",
      cart,
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete a book from the cart
export const deleteBookFromCart = async (req, res) => {
  try {
    const { userId, bookId } = req.query;

    // Ensure userId and bookId are provided
    if (!userId || !bookId) {
      return res.status(400).json({ message: "Missing userId or bookId" });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the book to remove
    const bookIndex = cart.books.findIndex(
      (item) => item.book._id.toString() === bookId
    );
    if (bookIndex === -1) {
      return res.status(404).json({ message: "Book not found in cart" });
    }

    // Get the book details to update the total price
    const { quantity } = cart.books[bookIndex];
    const book = await Book.findById(bookId);

    // If the book doesn't exist in the database
    if (!book) {
      return res.status(404).json({ message: "Book not found in database" });
    }

    // Update the total price by deducting the price of the removed book
    cart.totalPrice -= book.price * quantity;

    // Remove the book from the cart
    cart.books.splice(bookIndex, 1);
    if (cart.books.length === 0) {
      await Cart.deleteOne({ user: userId });
      return res
        .status(200)
        .json({ message: "Cart removed successfully" });
    }

    // Save the updated cart
    await cart.save();

    // Respond with the updated cart
    res.status(200).json({
      message: "Book removed from cart successfully",
      cart,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteAllBooksFromCart = async (req, res) => {
  try {
    const { userId } = req.query;

    // Ensure userId is provided
    if (!userId) {
      return res.status(400).json({ message: "Missing userId" });
    }

    // Find the user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove all books from the cart
    await Cart.deleteOne({ user: userId });

    return res.status(200).json({ message: "All books removed from cart successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//  getcart item
export const getBooksFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.find({ user: userId }).populate("books.book");
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
