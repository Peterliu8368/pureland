import React, { useContext} from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar=()=>{
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory();
    const renderList = () =>{
        if(state) {
            return (
                [<li key={3}><Link style={{fontSize: 22}} to="/profile">Profile</Link></li>,
                <li key={4}><Link style={{fontSize: 22}} to="/create">Create Post</Link></li>,
                <li key={5}><Link style={{fontSize: 22}} to="/followingpost">My Follow</Link></li>,
                <li key={6}><button onClick={()=>{
                    localStorage.clear()
                    dispatch({"type": "CLEAR"})
                    history.push('/login')
                }} className="btn waves-effect waves-light #ef5350 red lighten-1">Logout
                </button></li>]
            )
        } else {
            return ([
                <li key={1}><Link style={{fontSize: 22}} to="/login">Login</Link></li>,
                <li key={2}><Link style={{fontSize: 22}} to="/signup">Signup</Link></li>
            ])
        }
    }

    return (
        <nav>
            <div className="nav-wrapper white">
                <Link style={{marginLeft:"3rem", fontSize: 35}} to={state?"/":"/login"} className="brand-logo left">Pureland</Link>
                <ul style={{marginRight:"2rem"}} id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar