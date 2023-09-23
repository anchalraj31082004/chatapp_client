import React, { useEffect } from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"))

    if(user){
      navigate("/chats")
    }
  }, [navigate])

  return (
    <div>
      <Register />
    </div>
  );
};

export default Home;
