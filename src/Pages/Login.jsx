import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast("Fill the required field", {
        type: "warning",
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setLoading(false);
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        config
      );

      toast("Login Sucessfully", {
        type: "success",
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setLoading(false);

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        type: "warning",
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center  min-h-screen  ">
        <div className="flex flex-col bg-slate-900 px-4 mx-10 sm:px-6 md:px-8 lg:px-16 py-8 sm:max-w-md text-slate-200 rounded-xl items-center">
          <span className="text-3xl mb-8 md:text-4xl lg:text-5xl font-extrabold tracking-wide text-amber-500 ">
            Login
          </span>
          <form className="flex flex-col gap-8">
            <input
              className="focus:outline-none border-b-2 py-1 px-2 bg-slate-900 border-slate-400 placeholder:text-white"
              type="email"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="focus:outline-none border-b-2 py-1 px-2 bg-slate-900 border-slate-400 placeholder:text-white"
              type="password"
              placeholder="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="px-6 p-2 bg-amber-500 hover:bg-amber-700  text-black font-semibold rounded-lg"
              onClick={(e) => submitHandler(e)}
            >
              Sign in
            </button>
          </form>
          <p className="text-xs font-light text-center mt-4">
            Don't have an account?{" "}
            <Link
              className="text-orange-400 hover:text-orange-700 active:text-orange-700 text-base"
              to="/home"
            >
              Register
            </Link>{" "}
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
