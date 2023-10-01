import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ChatPage from "./Pages/ChatPage";
import Register from "./Pages/Authentication/Register";
import Login from "./Pages/Authentication/Login";

const App = () => {
  return (
    <div className="bg-slate-900 h-screen backdrop-blur-lg backdrop-filter bg-opacity-70 ">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
};

export default App;