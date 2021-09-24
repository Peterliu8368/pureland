import React, {useState, useContext } from 'react'
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css'
import {UserContext} from '../App'

const Login = () => {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();
    const {state, dispatch} = useContext(UserContext)

    const loginHandler= () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({html: "Invalid email", classes:"#b71c1c red darken-4"})
        }
        if (password.length < 8) {
            return M.toast({html: "Password must have more than 8 characters", classes:"#b71c1c red darken-4"})
        }
        fetch("/signin", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error){
                M.toast({html: data.error, classes:"#b71c1c red darken-4"})
            }
            else {
                localStorage.setItem('jwt', data.token)
                localStorage.setItem('user', JSON.stringify(data.user))
                dispatch({type: "USER", payload:data.user})
                M.toast({html: "Login successful", classes:"#43a047 green darken-1"})
                history.push('/')
            }
        })
        .catch(err=>console.log("signin route error",err))
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h5>Stay True</h5>
                <input type="text" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button onClick={loginHandler} style={{marginTop:"2rem"}} className="btn waves-effect waves-light #26a69a teal lighten-1" type="submit">Login
                </button>
                <p>
                    <Link style={{fontFamily: 'roboto', textDecoration:"underline"}} to="/reset">Forget your password?</Link>
                </p>
                <p>
                    <Link style={{fontFamily: 'roboto', textDecoration:"underline"}} to="/signin">Start your journey here</Link>
                </p>
            </div>
        </div>
    )
}

export default Login