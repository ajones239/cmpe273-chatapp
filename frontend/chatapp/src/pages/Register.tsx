import React from "react";

const Register = () => { 
    return(
        
        <form>
            <h1 className="h3 mb-3 fw-normal">Please Register</h1>

            <input className="form-control" placeholder="Name" required/>
            
            <input type="email" className="form-control" placeholder="Email address" required/>
        
            <input type="password" className="form-control" placeholder="Password" required/>
        
            <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
        </form>
        
    );
};

export default Register;