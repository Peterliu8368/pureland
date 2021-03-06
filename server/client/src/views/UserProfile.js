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

    const followUser = () =>{
        fetch('/follow', {
            method: 'put',
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: userId
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type: "UPDATE", payload: {following: data.following, followers: data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            setProfile(prevState=>{
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            })
            console.log(data);
        })
    }

    const unfollowUser = () =>{
        fetch('/unfollow', {
            method: 'put',
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: userId
            })
        }).then(res=>res.json())
        .then(data=>{
            dispatch({type: "UPDATE", payload: {following: data.following, followers: data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            
            setProfile(prevState=>{
                const newFollowers = prevState.user.followers.filter(item=>item !== data._id)
                return {
                    ...prevState,
                    user: {
                        ...prevState.user,
                        followers:newFollowers
                    }
                }
            })
            console.log(data);
        })
    }

    return (
        <>
            {userProfile? <div className="profile-div">
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    margin: "18px 0px",
                    borderBottom: "1px solid gray"
                }}>
                    <div>
                        <img style={{width:160, height:160, borderRadius:80}} src={userProfile?.user.pic} alt="profile-pic" />
                    </div>
                    <div style={{display: 'flex', flexDirection:"column", alignItems:'start', justifyContent:'center'}}>
                        <h4>
                            {userProfile?.user?.name}
                            {
                                !userProfile.user.followers.includes(state._id)?
                                <i style={{cursor: 'pointer', color:'green', marginLeft:10}} onClick={followUser} className="material-icons">add_circle</i>
                                :
                                <i style={{cursor: 'pointer', color:'red', marginLeft:10}} onClick={unfollowUser} className="material-icons">remove_circle</i>
                            }
                        </h4>
                        <div style={{display: 'flex', justifyContent:'space-between', width:"117%"}}>
                            <h6>{userProfile?.posts?.length} posts</h6>
                            <h6>{userProfile?.user.followers.length || 0} followers</h6>
                            <h6>{userProfile?.user.following.length || 0} following</h6>
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