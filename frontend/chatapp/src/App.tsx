import React from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import ChatApp from "./pages/ChatApp";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

    //note that this is using react-router-dom v6
  return (
    
      <Router>
        <div>
          <Nav/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="chat" element={<Chat />} />
              <Route path="room" element={<ChatApp />} />

          </Routes>
        </div>
      </Router>
  );
}

export default App;
