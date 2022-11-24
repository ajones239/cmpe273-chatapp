import React from 'react';
import {Link} from 'react-router-dom';

const Nav = ()=> {

    const logout = async ()=> {
        await fetch("http://localhost:8000/api/logout", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', //for fetching cookies
        });

    }

    let chatmenu;
    let defaultmenu;
   
    chatmenu = (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                <li className="nav-item active">
                    <Link to="/login" className="navbar-brand"onClick ={logout}><button>Logout</button></Link>
                </li>
            </ul>
        </nav>
    )
   
    defaultmenu = (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand">Home</Link>
            <div>
                <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item active">
                        <Link to="/register" className="navbar-brand">Register</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="/login" className="navbar-brand">Login</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    )



    return(
        <>
            {defaultmenu}
        </>
    );
};

export default Nav;