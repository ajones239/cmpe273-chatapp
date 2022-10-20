import React from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    
      <Router>
        <div>
          <Nav />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="register" element={<Register />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
