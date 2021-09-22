import React from "react";
import { Link } from "react-router-dom";

const Navbar=()=>{
    return (
        <nav>
            <div className="nav-wrapper white">
                <Link style={{marginLeft:"3rem"}} to="/" className="brand-logo left">Pureland</Link>
                <ul style={{marginRight:"2rem"}} id="nav-mobile" className="right">
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar