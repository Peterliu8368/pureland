import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css'
const Signup = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const history = useHistory();

    const createUser= () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({html: "Invalid email", classes:"#b71c1c red darken-4"})
        }
        if (password.length < 8) {
            return M.toast({html: "Password must have more than 8 characters", classes:"#b71c1c red darken-4"})
        }
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "Application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#b71c1c red darken-4"})
            }
            else {
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                history.push('/login')
            }
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h5>Stay Focused</h5>
                <input type="text" placeholder="name" value={name} onChange={e=>setName(e.target.value)}/>
                <input type="text" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                <input type="password" placeholder="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button onClick={createUser} style={{marginTop:"2rem"}} className="btn waves-effect waves-light #26a69a teal lighten-1" type="submit">Signup
                </button>
                <p>
                    <Link style={{fontFamily: 'roboto', textDecoration:"underline"}} to="/login">Already have an account?</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup