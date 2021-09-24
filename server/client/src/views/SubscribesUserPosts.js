import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '../App'
import { Link } from "react-router-dom";

const SubscribesUserPosts = () => {
    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)
    

    useEffect(()=> {
        fetch('/getSubpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result);
            setData(result.posts)
        })
    }, [])
    if (!data) {
        return 'loading...'
    }

    const likePost = (id) =>{
        fetch('/like', {
            method:'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result);
            const newData = data.map(item=>{
                if (item._id === result._id){
                    return result
                } else {
                    return item
                }
            })
            setData(newData);
        }).catch(err => console.log(err))
    }

    const unLikePost = (id) =>{
        fetch('/unlike', {
            method:'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result);
            const newData = data.map(item=>{
                if (item._id === result._id){
                    return result
                } else {
                    return item
                }
            })
            setData(newData);
        }).catch(err => console.log(err))
    }

    const makeComment = (text, postId) => {
        if(text.length === 0){
            return
        }
        fetch("/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId,
                text
            })
        })
        .then(res=>res.json())
        .then(result=>{
            // console.log(result);
            const newData = data.map(item=>{
                document.getElementById(item._id).value = '';
                if (item._id === result._id){
                    return result
                } else {
                    return item
                }
            })
            setData(newData)
        }).catch(err => console.log(err))
    }

    const deletePost = (postId) => {
        fetch(`/deletepost/${postId}`, {
            method:"delete",
            headers:{
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData = data.filter(item=>{
                return item._id !== postId
            })
            setData(newData)
        })
    }

    return (
        <div className="home">
            {
                data.map(item=>{
                    return (
                        <div key={item._id} className="card home-card">
                            <h5 className="userName">
                                <img className="profile-icon" src={item.postedBy.pic} alt="profile pic" />

                                <Link to={item.postedBy._id !== state._id?`/profile/${item.postedBy._id}`:"/profile"}>{item.postedBy.name}</Link> 
                                
                                {item.postedBy._id == state._id && <i style={{cursor: 'pointer', float:"right", marginTop:"5px"}} className="material-icons" onClick={()=>{
                                deletePost(item._id)
                                }}>delete</i>} 
                            </h5>
                            <div className="card-image">
                                <img src={item.photoUrl} alt="" />
                            </div>
                            <div className="card-content">
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    {item.likes.includes(state._id)?
                                        <i style={{cursor: 'pointer', color:'red'}} onClick={() => {
                                            unLikePost(item._id)
                                        }} className="material-icons">favorite</i> :

                                        <i style={{cursor: 'pointer'}} onClick={() => {
                                            likePost(item._id)
                                        }} className="material-icons">favorite_border</i>
                                    }
                                    
                                    <span style={{marginLeft: "1rem"}}>{item.likes.length} likes</span>
                                </div>
                                <h6><span style={{fontWeight: "bold"}}>{item.postedBy.name} </span>{item.body}</h6>
                                {
                                    item.comments.map((record, i)=>{
                                        return (
                                            <h6 key={record._id}><span style={{fontWeight: "bold"}}>{record.postedBy.name} </span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault();
                                    makeComment(e.target[0].value, item._id);
                                }}>
                                    <input id={item._id} type="text" placeholder="add a comment" />   
                                    <button className="btn">Reply</button>
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SubscribesUserPosts