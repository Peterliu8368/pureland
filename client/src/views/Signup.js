import React from 'react'
import { Link } from "react-router-dom";

const Signup = () => {
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h5>Stay Focused</h5>
                <input type="text" placeholder="name"/>
                <input type="text" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <button style={{marginTop:"2rem"}} className="btn waves-effect waves-light #26a69a teal lighten-1" type="submit">Signup
                </button>
                <p>
                    <Link style={{fontFamily: 'roboto', textDecoration:"underline"}} to="/signin">Already have an account?</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup