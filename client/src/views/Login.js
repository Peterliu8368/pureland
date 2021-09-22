import React from 'react'
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="mycard">
            <div className="card auth-card">
                <h5>Stay True</h5>
                <input type="text" placeholder="email"/>
                <input type="password" placeholder="password"/>
                <button style={{marginTop:"2rem"}} className="btn waves-effect waves-light #26a69a teal lighten-1" type="submit">Login
                </button>
                <p>
                    <Link style={{fontFamily: 'roboto', textDecoration:"underline"}} to="/signin">Start your journey here</Link>
                </p>
            </div>
        </div>
    )
}

export default Login