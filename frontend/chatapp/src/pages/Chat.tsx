import React from "react";
import { Link } from "react-router-dom";
import ChatApp from "./ChatApp";
const Chat = () => { 

    const logout = async ()=> {
        await fetch("http://localhost:8000/api/logout", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', //for fetching cookies
        });

    }

    const enter = ()=>{
        new ChatApp();
    }

    let chatmenu;

   
    chatmenu = (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item active">
                <Link to="/room" className="navbar-brand"onClick ={enter}><button>Enter Room</button></Link>
                <Link to="/login" className="navbar-brand"onClick ={logout}><button>Logout</button></Link>
            </li>
        </ul>
    )
    
    return(
        <div>
            <h2>{'Welcome to Chat APP.'} </h2>
            <li>{chatmenu}</li>
        </div>
        
    );
};

export default Chat;