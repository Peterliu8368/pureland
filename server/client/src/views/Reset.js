import React, {useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import M from 'materialize-css'

const Reset = () => {
    const [email, setEmail] = useState('');
    const history = useHistory();

    const loginHandler= () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            return M.toast({html: "Invalid email", classes:"#b71c1c red darken-4"})
        }
        fetch("/reset-password", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email
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
        .catch(err=>console.log("signin route error",err))
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h5>Stay Healthy</h5>
                <input type="text" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                
                <button onClick={loginHandler} style={{marginTop:"2rem"}} className="btn waves-effect waves-light #26a69a teal lighten-1" type="submit">Reset Password
                </button>
            </div>
        </div>
    )
}

export default Reset