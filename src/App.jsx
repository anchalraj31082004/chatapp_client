import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ChatPage from "./Pages/ChatPage";

const App = () => {
  return (
    <div className="bg-slate-900 min-h-screen backdrop-blur-lg backdrop-filter bg-opacity-70 ">
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
