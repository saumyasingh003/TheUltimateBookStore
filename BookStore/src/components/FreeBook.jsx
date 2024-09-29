import React, { useEffect, useState } from "react";
import axios from "axios";

function Freebook() {
  const [books, setBooks] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get("http://localhost:4000/book");
        //  console.log(res.data);
        setBooks(res.data); // Update state with fetched books data
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  // Filter the books that are free
  const filterData = books.filter((data) => data.category === "free");

  return (
    <div className="flex flex-col md:items-center mb-10 mt-10 md:mt-2 ">
      <h1 className=" text-2xl  md:text-3xl font-bold mb-4 text-center">
        Free Books
      </h1>
      <div className="mb-8  md:text-lg text-center px-4 md:px-6 lg:px-16 w-full">
        Reading books opens doors to new worlds and ideas, enriching our
        understanding of life and human experience. It fosters imagination,
        encourages empathy, and enhances cognitive skills, making it a vital
        activity for personal growth.
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
        {filterData.length > 0 ? (
          filterData.map((book, index) => (
            <div
              key={book.id || index}
              className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105 duration-300"
            >
              <a href={book.booklink} target="_blank" rel="noopener noreferrer">
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
                  <h5 className="mb-2 text-sm sm:text-lg font-semibold uppercase tracking-tight text-gray-900 dark:text-white">
                    {book.name}
                  </h5>
                </a>
                <p className="mb-3 text-xs sm:text-sm text-gray-700 dark:text-gray-400">
                  {book.title}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No free books available.</p>
        )}
      </div>
    </div>
  );
}

export default Freebook;
