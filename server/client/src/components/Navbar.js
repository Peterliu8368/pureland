import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";
import M from 'materialize-css'

const Navbar=()=>{
    const searchModal = useRef(null)
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory();
    const [search, setSearch] = useState("")

    useEffect(()=>{
        M.Modal.init(searchModal.current)
    }, [])

    const renderList = () =>{
        if(state) {
            return (
                [<li key={7}><i data-target="modal1" style={{cursor: 'pointer', color: "black", marginTop: 3}} className="large material-icons modal-trigger">search</i></li>,
                <li key={3}><Link style={{fontSize: 22}} to="/profile">Profile</Link></li>,
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
            {/*Modal Structure */}
            <div id="modal1" className="modal" ref={searchModal} style={{overflow: 'auto', maxHeight:"50vh"}}>
                <div className="modal-content" style={{color:'black'}}>
                    <input type="text" placeholder="search user name" value={search} onChange={e=>setSearch(e.target.value)}/>
                    <ul className="collection">
                        <li className="collection-item">Alvin</li>
                        
                    </ul>
                </div>
                    <div className="modal-footer">
                    <button href="#!" className="modal-close waves-effect waves-green btn-flat">Find</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar