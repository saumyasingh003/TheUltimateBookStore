import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom"; // Correct import

function Morebooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartBooks, setCartBooks] = useState([]);
  const [likedBooks, setLikedBooks] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://book-store-backend-ul1r.onrender.com/book"
        );
        setBooks(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getBooks();
    fetchCart();
    fetchLikes();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(
        `https://book-store-backend-ul1r.onrender.com/cart/getCartItems`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartBooks(response.data?.cartItems[0]?.books || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const fetchLikes = async () => {
    try {
      const response = await axios.get(`https://book-store-backend-ul1r.onrender.com/like/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLikedBooks(response.data?.likedBooks || []);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const toggleLike = async (bookId) => {
    const isLiked = likedBooks.some((item) => item?._id === bookId);

    try {
      if (isLiked) {
        await axios.delete(`https://book-store-backend-ul1r.onrender.com/like/${userId}/${bookId}`);
        setLikedBooks(likedBooks.filter((book) => book._id !== bookId));
        toast.success("Sorry, you don't like this book anymore!");
      } else {
        await axios.post("https://book-store-backend-ul1r.onrender.com/like", { userId, bookId });
        setLikedBooks([...likedBooks, { _id: bookId }]);
        toast.success("Thanks for liking this book!");
      }
    } catch (error) {
      console.error("Error liking/unliking book:", error);
      toast.error("Failed to update like status");
    }
  };

  const isBookLiked = (bookId) =>
    likedBooks.some((item) => item._id === bookId);

  const filterData = books.filter((data) => data.category === "paid");

  const addBookToCart = async (bookId) => {
    try {
      const response = await axios.post("https://book-store-backend-ul1r.onrender.com/cart/add", {
        userId,
        bookId,
        quantity: 1,
      });
      toast.success(response.data.message);
      setCartBooks([...cartBooks, { book: { _id: bookId } }]);
    } catch (error) {
      console.error("Error adding book to cart:", error);
      toast.error("Failed to add book to cart");
    }
  };

  const isBookInCart = (bookId) =>
    cartBooks.some((item) => item.book?._id === bookId);

  return (
    <div>
      <Toaster />
      {loading ? (
        <div className="flex justify-center mb-4">
          <ClipLoader color="green" size={40} />
        </div>
      ) : (
        <div className="flex flex-col md:items-center mb-10 mt-20  md:mt-2">
          <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
            <div className="mt-28 items-center justify-center text-center">
              <h1 className="text-xl md:text-4xl">
                We're delighted to have you{" "}
                <span className="text-pink-500">Here! :)</span>
              </h1>
              <p className="mt-12">
                Books broaden our horizons by exposing us to diverse
                perspectives and cultures. They enhance our vocabulary and
                writing skills, fostering better communication. Reading improves
                focus and concentration, allowing us to engage deeply with
                content. Additionally, books stimulate our imagination and
                creativity, inspiring personal growth and lifelong learning.
              </p>
              <Link to="/">
                <button className="mt-6 mb-10 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
                  Back
                </button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {!loading && filterData.length > 0 ? (
              filterData.map((book) => (
                <div
                  key={book._id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105 duration-300"
                >
                  <a
                    href={book.booklink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="p-2 md:p-4 bg-[#323168] rounded-t-lg">
                      <img
                        className="rounded-t-lg w-full h-48 sm:h-64 object-cover"
                        src={book.image}
                        alt={book.name}
                      />
                    </div>
                  </a>
                  <div className="p-4">
                    <a href={book.booklink}>
                      <h5 className="mb-2 sm:text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                        {book.name}
                      </h5>
                    </a>
                    <div className="float-end mb-5">
                      <FaShoppingCart
                        className={`w-6 h-6 cursor-pointer ${
                          isBookInCart(book._id)
                            ? "text-green-600"
                            : "text-blue-400"
                        }`}
                        onClick={() => addBookToCart(book._id)}
                      />
                    </div>
                    <div
                      onClick={() => toggleLike(book._id)}
                      className="cursor-pointer"
                    >
                      {isBookLiked(book._id) ? (
                        <FaHeart className="w-6 h-6 text-red-500" />
                      ) : (
                        <FaRegHeart className="w-6 h-6 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No free books available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Morebooks;
