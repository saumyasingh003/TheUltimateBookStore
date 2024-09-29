import React, { useState } from "react";
import books from "../components/assets/books.png";
import Freebook from "./FreeBook";
function Banner() {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto lg:px-40 md:px-20 px-10 md:mt-20 flex flex-col md:flex-row">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-8 md:mt-24">
          <div className="space-y-8"> 
            <h1 className="text-2xl md:text-4xl font-bold">
              Hello, Welcomes here to learn something{" "}
              <span className="text-pink-500">New Everyday!!!</span>
            </h1>
            <p className="text-sm md:text-xl">
              We're excited to have you here, where every day is a new
              opportunity to learn and grow. Dive into fresh insights, explore
              new topics, and broaden your knowledge with us. Let's make
              learning an exciting part of your daily routine!
            </p>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className={`w-4 h-4 opacity-70 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>
          </div>
          <button className="btn mt-4 btn-success">Get Started</button>
        </div>
        <div className="order-1 w-full md:mt-12  mt-20 relative  md:w-1/2">
          <img
            src={books}
            className="md:w-[600px] md:h-[460px] md:ml-12"
            alt=""
          />
        </div>
      </div>
      <div className="align-center relative lg:px-40 md:px-20 px-20">
        <Freebook />
      </div>
    </>
  );
}

export default Banner;
