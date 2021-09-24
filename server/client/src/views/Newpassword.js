import React, {useState, useContext } from 'react'
import { useHistory, useParams } from "react-router-dom";
import M from 'materialize-css'

const Login = () => {
    const {token} = useParams();
    console.log(token);
    const [password, setPassword] = useState('');
    const history = useHistory();
    const loginHandler= () => {
        
        if (password.length < 8) {
            return M.toast({html: "Password must have more than 8 characters", classes:"#b71c1c red darken-4"})
        }
        fetch("/new-password", {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.error){
                M.toast({html: data.error, classes:"#b71c1c red darken-4"})
            }
            else {
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                history.push('/login')
            }
        })
        .catch(err=>console.log("reset password route error",err))
    }

    return (
        <div className="mycard">
            <div className="card auth-card">
                <h5>Stay Energetic</h5>
                
                <input type="password" placeholder="Enter a new password" value={password} onChange={e=>setPassword(e.target.value)}/>
                <button onClick={loginHandler} style={{marginTop:"2rem"}} className="btn waves-effect waves-light #26a69a teal lighten-1" type="submit">Update Password
                </button>
            </div>
        </div>
    )
}

export default Login