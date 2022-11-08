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

    return(
        
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>
            
            <input className="form-control" placeholder="Name" required
                onChange={e => setName(e.target.value)}
            />
            
            <input type="email" className="form-control" placeholder="Email address" required
                onChange={e => setEmail(e.target.value)}
            />
        
            <input type="password" className="form-control" placeholder="Password" required
                onChange={e => setPassword(e.target.value)}
            />
        
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
        </form>
        
    );
};

export default Register;