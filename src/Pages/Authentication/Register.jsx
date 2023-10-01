import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast("Select an image !", {
        type: "warning",
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatapp");
      // data.append("cloud_name", "dxfembk3i");
      fetch("https://api.cloudinary.com/v1_1/dxfembk3i", {
        method: "POST",
        body: data,
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log("Cloudinary response :", data);
          setPic(data?.url?.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
      console.log(pics);
    } else {
      toast("Choose a picture", {
        position: "top-center",
        type: "warning",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setLoading(false);
      return;
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !email || !password) {
      toast("Please fill all the required feild", {
        type: "warning",
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }

    if (password === !confirmPassword) {
      toast("Password is incorrect", {
        type: "warning",
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/register",
        { name, email, password, pic },
        config
      );
      toast("Registration Successful", {
        type: "success",
        position: "top-center",
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast(`Error Occured ${error.message}`, {
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
      <div className="flex items-center justify-center  min-h-screen ">
        <div className="flex flex-col bg-slate-900 px-4 mx-10 sm:px-6 md:px-8 lg:px-16 py-8 sm:max-w-md text-slate-200 rounded-xl items-center">
          <span className="text-3xl  mb-5 md:text-4xl lg:text-5xl font-extrabold tracking-wide text-amber-500 ">
            Register
          </span>
          <form className="flex flex-col gap-8">
            <input
              className=" focus:outline-none border-b-2 py-1 px-2 bg-slate-900 border-slate-400 placeholder:text-white"
              type="text"
              value={name}
              required
              placeholder="display name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className=" focus:outline-none border-b-2 py-1 px-2 bg-slate-900 border-slate-400 placeholder:text-white"
              type="email"
              placeholder="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-between items-center border-b-2">
              <input
                className=" focus:outline-none  py-1 px-2 bg-slate-900 border-slate-400 placeholder:text-white"
                type={show ? "text" : "password"}
                placeholder="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>
                <button onClick={handleClick}>
                  {show ? (
                    <AiFillEyeInvisible className="text-xl font-bold" />
                  ) : (
                    <AiFillEye className="text-xl font-bold" />
                  )}
                </button>
              </span>
            </div>
            <div className="flex justify-between items-center border-b-2">
              <input
                className=" focus:outline-none  py-1 px-2 bg-slate-900 border-slate-400 placeholder:text-white"
                type={show ? "text" : "password"}
                placeholder="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <span>
                <button onClick={(e) => handleClick(e)}>
                  {show ? (
                    <AiFillEyeInvisible className="text-xl font-bold" />
                  ) : (
                    <AiFillEye className="text-xl font-bold" />
                  )}
                </button>
              </span>
            </div>
            <input
              className=" focus:outline-none border-b-2 border-slate-400 placeholder:text-white py-1 px-2 bg-slate-900"
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
            <button
              className="px-6 p-2 bg-amber-500 hover:bg-amber-700 transition-all text-black font-semibold rounded-lg"
              onClick={(e) => submitHandler(e)}
            >
              Sign up
            </button>
          </form>
          <p className="text-xs font-light text-center mt-4">
            You do have an account?{" "}
            <Link
              className="text-orange-400 hover:text-orange-700 active:text-orange-700 text-base"
              to="/login"
            >
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Register;
