import React,{SyntheticEvent, useState} from "react";
import {Navigate} from 'react-router-dom';


const Login = (props: { setName: (name: string) => void }) =>{

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

        //the order matters here redirect before set name
        setredir_url(true);
        props.setName(content.name);
    }

    if(redir_url){
        return <Navigate to='/home'/>
    }

    return(
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <input type="email" className="form-control" placeholder="Email address" required
                onChange = {e => setEmail(e.target.value)}
            />
        
            <input type="password" className="form-control" placeholder="Password" required
                onChange = {e => setPassword(e.target.value)}
            />
        
            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    );
};

export default Login;