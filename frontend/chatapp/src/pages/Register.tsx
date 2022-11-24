import React, {SyntheticEvent, useState} from "react";
import {Navigate} from 'react-router-dom';


const Register = () => { 

    //React states to get state and store in var
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redir_url, setredir_url] = useState(false);

    //on submit, send form info to backend
    const submit = async(e: SyntheticEvent) =>{
        //prevent page from refreshing after submit
        //after submit to verify
        //if Console logs data entered
        e.preventDefault();

        /*
        console.log({
            name, 
            email,
            password
        })
        */
        const response = await fetch("http://localhost:8000/api/register", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        });

        const content = await response.json();

        console.log(content);

        setredir_url(true);
    }

    if(redir_url){
        return <Navigate to='/login'/>
    }

    const Style = {
    body:{
        backgroundColor: 'Purple',
        paddingTop: 250,
        paddingBottom: 300,
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
            <h1 className="text-lg-start">Please Register</h1>

            </div>      
            <div style={Style.Input}  >  
            <input className="form-control" placeholder="Name" required
                onChange={e => setName(e.target.value)}
            />
            <ul></ul>
            <input type="email" className="form-control" placeholder="Email address" required
                onChange={e => setEmail(e.target.value)}
            />
            <ul></ul>
            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />
            </div> 
            <div style={Style.Button}>
            <button className="w-100 btn btn-lg btn-dark" type="submit">Sign up</button>
            </div>
        </form>
        </div>
        
    );
};

export default Register;