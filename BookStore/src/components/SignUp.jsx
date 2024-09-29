import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import  toast from 'react-hot-toast';

const SignUp = () => {
  const location = useLocation();
 
  const from = location.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (user) => {
    const userInfo = {
      fullname: user.fullname,
      email: user.email,
      password: user.password,
    };
    await axios
      .post("http://localhost:4000/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("signup successfully!!");
          navigate(from, { replace: true });
        }
        localStorage.setItem("Users" ,JSON.stringify(res.data.user));
      })
      .catch((error) => {
       if(error.response){
        console.log(error);
        toast.error("Error:" + error.response.data.message);
       }
      });
  };

  const navigate = useNavigate();
  const handleClose = () => {
    navigate("/");
  };

  const [theme, setTheme] = useState("light");

  return (
    <div className="flex justify-center items-center mt-40 mb-20">
      <div className="modal-box w-96">
        <button
          type="button"
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={handleClose} // Call handleClose on click
        >
          ✕
        </button>

        <h3 className="text-lg font-bold text-center">Register</h3>

        <form
          method="dialog"
          className="flex flex-col items-center space-y-4 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Username Input */}
          <div className="w-full">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Fullname"
              className="input input-bordered w-full"
              {...register("fullname", { required: true })}
            />
            {errors.username && (
              <span className="text-red-900">Fullname is required</span>
            )}
          </div>

          {/* Email Input */}
          <div className="w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-900">Email is required</span>
            )}
          </div>

          {/* Password Input */}
          <div className="w-full">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-900">Password is required</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn text-white btn-success w-[50%]">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already signed in?{" "}
          <Link to="/" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
