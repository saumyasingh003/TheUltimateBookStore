import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";

const Freebook = () => {
  const [books, setBooks] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("https://book-store-backend-ul1r.onrender.com/book");
        console.log(res.data);
        setBooks(res.data); // Update state with fetched books data
      } catch (error) {
        console.log(error);
      }
    };
    getBooks(); // Call the async function to fetch books
  }, []); // Empty dependency array to run only once

  // Filter the books where category is "paid"
  const filterData = books.filter((book) => book.category === "paid");

  return (
    <div className="flex flex-col items-center p-4 ">
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 ">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-xl md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-500">Here! :{")"}</span>
          </h1>
          <p className="mt-12">
            Books broaden our horizons by exposing us to diverse perspectives
            and cultures. They enhance our vocabulary and writing skills,
            fostering better communication. Reading improves focus and
            concentration, allowing us to engage deeply with content.
            Additionally, books stimulate our imagination and creativity,
            inspiring personal growth and lifelong learning.
          </p>
          <Link to="/">
            <button className="mt-6 mb-10 bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              Back
            </button>
          </Link>
        </div>
      </div>

      {/* Book Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 ">
        {filterData.length > 0 ? (
          filterData.map((book) => (
            <div
              key={book.id}
              className="max-w-xs bg-white border border-gray-200 rounded-lg mb-5 shadow-md dark:bg-gray-800 dark:border-gray-700 hover:scale-105 duration-200"
            >
              <a href={book.booklink} target="_blank" rel="noopener noreferrer">
                <div className="p-4 bg-[#323168] rounded-t-lg">
                  <img
                    className="rounded-t-lg w-full h-[45vh] object-cover"
                    src={book.image}
                    alt={book.name}
                  />
                </div>
              </a>

              <div className="p-4">
                <a href={book.booklink}>
                  <h5 className="mb-2 text-lg font-semibold uppercase tracking-tight text-gray-900 dark:text-white">
                    {book.name}
                  </h5>
                </a>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                  {book.title}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No paid books available.</p> // Updated text to match the filtering criteria
        )}
      </div>
    </div>
  );
};

export default Freebook;
