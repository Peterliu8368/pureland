import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../App';
import { useParams } from "react-router-dom";

const Profile = () => {
    const [userProfile, setProfile] = useState(null);
    const {state, dispatch} = useContext(UserContext)
    const {userId} = useParams()
    useEffect(() => {
        fetch(`/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            setProfile(result)
        })
    }, [])

    return (
        <>
            {userProfile? <div style={{maxWidth:"69vw", margin: "0 auto"}}>
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
                        <h4>{userProfile?.user?.name}</h4>
                        <h5>{userProfile?.user?.email}</h5>
                        <div style={{display: 'flex', justifyContent:'space-between', width:"117%"}}>
                            <h6>{userProfile?.posts?.length} posts</h6>
                            <h6>69 followers</h6>
                            <h6>69 following</h6>
                        </div>
                    </div>
                </div>
                
                <div className="gallery">
                    {
                        userProfile?.posts?.map(item=> {
                            return <img key={item._id} className="item" src={item.photoUrl} alt="body" />
                        })
                    }
                </div>
            </div>: <h2>Loading...</h2>}
        </>
        
    )
}

export default Profile