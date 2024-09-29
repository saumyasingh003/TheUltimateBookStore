import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const onSubmit = async (user) => {
    const userInfo = {
      email: user.email,
      password: user.password,
    };
    await axios
      .post("http://localhost:4000/user/login", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success("loggedin successfully!!");
          document.getElementById("login").close();
          setTimeout(() => {
            window.location.reload();
            localStorage.setItem("Users", JSON.stringify(res.data.user));
          }, 3000);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error);
          toast.error("Error:" + error.response.data.message);
          setTimeout(()=>{}, 3000);
        }
      });
  };

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    document.getElementById("login").close();
    navigate("/signup");
  };

  return (
    <div>
      <dialog id="login" className="modal">
        <div className="modal-box w-96">
          <form
            onSubmit={handleSubmit(onSubmit)}
            method="dialog"
            className="flex flex-col items-center space-y-4"
          >
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <h3 className="text-lg font-bold">Login</h3>

            {/* Email Input */}
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-900">Email is required</span>
            )}

            {/* Password Input */}
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-900">Password is required</span>
            )}
            {/* Submit Button */}
            <button
              type="submit"
              className="btn text-white btn-success w-[50%]"
            >
              Submit
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-sm text-center mt-4">
            Not registered?{" "}
            <Link
              to="/signup"
              className="text-blue-500 hover:underline"
              onClick={handleSignUpClick}
            >
              Sign up
            </Link>
          </p>
        </div>
      </dialog>
    </div>
  );
};

export default Login;
