import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '../App'

const Home = () => {
    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)
    const [userComment, setComment] = useState('')

    useEffect(()=> {
        fetch('/allpost', {
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
                if (item._id === result._id){
                    return result
                } else {
                    return item
                }
            })
            setData(newData)
            setComment('')
        }).catch(err => console.log(err))
    }

    return (
        <div className="home">
            {
                data.map(item=>{
                    return (
                        <div key={item._id} className="card home-card">
                            <h5 className="userName">{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img src={item.photoUrl} alt="" />
                            </div>
                            <div className="card-content">
                                {item.likes.includes(state._id)?
                                    <i style={{cursor: 'pointer', color:'red'}} onClick={() => {
                                        unLikePost(item._id)
                                    }} className="material-icons">favorite</i> :

                                    <i style={{cursor: 'pointer'}} onClick={() => {
                                        likePost(item._id)
                                    }} className="material-icons">favorite_border</i>
                                }
                                
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
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
                                    <input type="text" placeholder="add a comment" onChange={e=>{
                                        setComment(e.target.value)
                                        }} value={userComment}/>   
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home