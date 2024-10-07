import React, { useEffect, useState } from "react";
import cartimage from "../components/assets/cartimage.jpg";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from 'sweetalert2';

const Cartpage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "https://book-store-backend-ul1r.onrender.com/cart/getCartItems",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCartItems(response.data.cartItems);
        setTotalPrice(
          response.data.cartItems.reduce(
            (acc, item) => acc + item.totalPrice,
            0
          )
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [token]);

  const deleteBookFromCart = async (bookId) => {
    try {
      await axios.delete(
        `https://book-store-backend-ul1r.onrender.com/cart/delete?userId=${userId}&bookId=${bookId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          books: item.books.filter((book) => book.book._id !== bookId),
        }))
      );
    } catch (error) {
      console.error("Error deleting book from cart:", error);
    }
  };

  const handleBuyNow = () => {
    Swal.fire({
      title: 'Purchase Successful!',
      text: 'Your book has been successfully ordered. Enjoy your reading!',
      icon: 'success',
      confirmButtonText: 'Awesome!',
      confirmButtonColor: '#28a745',
    });
  };

  const handleProceedToCheckout = () => {
    Swal.fire({
      title: 'Proceed to Checkout',
      text: 'You are about to checkout with all items in your cart. Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Checkout!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Call API to delete all books from the cart
          await axios.delete(`https://book-store-backend-ul1r.onrender.com/cart/deleteAll?userId=${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Clear cart items in local state after successful deletion
          setCartItems([]);

          // Show success message after checkout and deletion
          Swal.fire(
            'Checkout Completed!',
            'Your order has been placed successfully. All items have been removed from the cart.',
            'success'
          );
        } catch (error) {
          console.error("Error during checkout:", error);
          Swal.fire(
            'Checkout Failed',
            'There was an issue during checkout. Please try again.',
            'error'
          );
        }
      }
    });
  };

  if (loading) {
    return <div>Loading cart items...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <div className="container max-w-screen-2xl mx-auto md:px-10 px-4">
        {/* Page Title and Description */}
        <div className="mt-28 items-center text-center">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-800 dark:text-white">
            What you have added in <span className="text-pink-500">Cart :</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-white">
            Books broaden our horizons by exposing us to diverse perspectives
            and cultures...
          </p>
        </div>

        {/* Products and Bill Summary Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-36 mb-10">
          {/* Products Section */}
          <div className="space-y-6">
            {cartItems.length > 0 ? (
              cartItems.map((cartItem) =>
                cartItem.books.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 max-w-3xl"
                  >
                    <div className="md:flex">
                      <img
                        className="object-cover lg:w-32 lg:h-32 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 md:w-40 md:h-40"
                        src={item.book.image || cartimage}
                        alt={item.book.title}
                      />
                      <div className="md:ml-6 mt-4 md:mt-0 flex-grow">
                        <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {item.book.name}
                        </h5>
                        <p className="text-lg text-gray-700 dark:text-gray-400 mt-2">
                          by {item.book.author}
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-400 mt-2">
                          $ {item.book.price}
                        </p>
                        <div className="flex space-x-4 mt-4">
                          <button
                            className="flex items-center bg-red-600 text-white rounded-lg px-6 py-2 hover:bg-red-700 transition duration-300"
                            onClick={() => deleteBookFromCart(item.book._id)}
                          >
                            <FaTrash className="mr-2" /> Delete
                          </button>
                          <button onClick={handleBuyNow} className="bg-green-600 text-white rounded-lg px-6 py-2 hover:bg-green-700 transition duration-300">
                            Buy Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )
            ) : (
              <p>No items in your cart yet.</p>
            )}
          </div>

          <div className="bg-blue-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg lg:mx-10 lg:px-40">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Bill Summary
            </h2>

            <div className="flex justify-between text-lg text-gray-700 dark:text-white mb-4">
              <span>Total Items</span>
              <span>
                {cartItems.reduce((acc, item) => acc + item.books.length, 0)}
              </span>
            </div>

            <div className="flex justify-between text-lg text-gray-700 dark:text-white mb-4">
              <span>Subtotal</span>
              <span>${totalPrice?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg text-gray-700 dark:text-white mb-4">
              <span>Extra Charges</span>
              <span>$ 50.00</span>
            </div>

            <div className="border-t border-gray-300 my-4"></div>

            <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white mb-4">
              <span>Total</span>
              <span>${(totalPrice + 50)?.toFixed(2)}</span>
            </div>

            <div className="flex justify-center">
              <button onClick={handleProceedToCheckout} className="w-full text-white rounded-lg px-6 py-3 mt-4 hover:bg-green-900 bg-green-700 transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
