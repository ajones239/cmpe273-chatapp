import React from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Register from "./pages/Register";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect, useState } from 'react';


function App() {

  const [name, setName] = useState('');

    //get user name after login
    useEffect( () => {
        (
            async () => {

                const response = await fetch("http://localhost:8000/api/user", {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include',
                });

                const content  = await response.json();

                setName(content.name);
            }
        )();
    });

    //note that this is using react-router-dom v6
  return (
    
      <Router>
        <div>
          <Nav name={name} setName={setName}/>
          <Routes>
              <Route path="/" element={<Home name={name}/>} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login setName={setName}/>} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
