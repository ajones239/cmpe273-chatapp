import React,{SyntheticEvent, useState} from "react";
import {Navigate} from 'react-router-dom';


const Login = () =>{

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redir_url, setredir_url] = useState(false);


    const submit = async(e: SyntheticEvent) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/login", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', //for fetching cookies
            body: JSON.stringify({
                email,
                password
            })
        });
        
        const content = await response.json();
        if(content.message === "incorrect password"){
            alert("Incorrect Password!")
        }else if(content.message === "User not found"){
            alert("Incorrect Email!")
        }else{
            //the order matters here redirect before set redir  
            console.log(content); 
            setredir_url(true);
        }
        
    }


    if(redir_url){
        return <Navigate to='/chat'/>
    }

    const Style = {
        body:{
            backgroundColor: 'Purple',
            paddingTop: 250,
            paddingBottom: 350,
        },
        h1: {color: 'Black',
            lineHeight: 10,
            paddingLeft: 850,
        }, 
        Input: {
            display: "block",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            paddingTop: 50,
            paddingLeft: 700,
            paddingRight: 700,
    
          },
        Button: {
            paddingTop: 50,
            paddingLeft: 800,
            paddingRight: 800,
            color: "black",
        }
    }


    return(
        <div style={Style.body}>
        <form onSubmit={submit}>
            <div style={Style.h1}>
                <h1 className="text-lg-start">Please Sign In</h1>
            </div>
            <div style={Style.Input}>
                <input type="email" className="form-control" placeholder="Email address" required
                    onChange = {e => setEmail(e.target.value)}
                />
                <ul></ul>
                <input type="password" className="form-control" placeholder="Password" required
                    onChange = {e => setPassword(e.target.value)}
                />
            </div>
            <div style={Style.Button}>
                <button className="w-100 btn btn-lg btn-dark" type="submit">Login</button>
            </div>
        </form>
        </div>
    );
};

export default Login;