import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App';

const Profile = () => {
    const [mypics, setMypics] = useState([]);
    const {state, dispatch} = useContext(UserContext)

    useEffect(() => {
        fetch('/mypost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(result=>{
            setMypics(result.myPosts)
            console.log(mypics);
        })
    }, [])

    return (
        <div style={{maxWidth:"69vw", margin: "0 auto"}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: "18px 0px",
                borderBottom: "1px solid gray"
            }}>
                <div>
                    <img style={{width:160, height:160, borderRadius:80}} src="https://images.unsplash.com/photo-1518577915332-c2a19f149a75?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=80" alt="profile-pic" />
                </div>
                <div>
                    <h4>{state?.name}</h4>
                    <h5>{state?.email}</h5>
                    <div style={{display: 'flex', justifyContent:'space-between', width:"117%"}}>
                        <h6>{mypics?.length} posts</h6>
                        <h6>{state?state.followers.length: 0} followers</h6>
                        <h6>{state?state.following.length: 0} following</h6>
                    </div>
                </div>
            </div>
            
            <div className="gallery">
                {
                    mypics.map(item=> {
                        return <img key={item._id} className="item" src={item.photoUrl} alt="body" />
                    })
                }
            </div>
        </div>
    )
}

export default Profile