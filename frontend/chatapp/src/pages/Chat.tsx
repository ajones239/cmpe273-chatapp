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
            <div>           
                <Link to="/room" onClick ={enter}><button className="w-100 btn btn-lg btn-dark">Enter Room</button></Link>
                <ul></ul>
                <Link to="/login" onClick ={logout}><button className="w-100 btn btn-lg btn-dark">Logout</button></Link>
            </div> 
       
    )

    const Style = {
        body:{
            alignContent: "Center",
            backgroundColor: 'Purple',
            paddingTop: 300,
            paddingBottom: 400,
            paddingLeft: 100,
            paddingRight: 100,

        },

        h2:{
            alignContent: "Center",
            paddingTop: 30,
            paddingLeft: 750,
            paddingRight: 90,
            paddingBottom: 20,

            text: "bold",

        },
        menu:{
            alignContent: "space-between",
            paddingLeft: 600,
            paddingRight: 600,
        },
    }
    
    return(
        <div style={Style.body}>
            <h2 style={Style.h2}>{'Welcome to ChatApp'} </h2>
            <div style={Style.menu}>{chatmenu}</div>
        </div>
        
    );
};

export default Chat;