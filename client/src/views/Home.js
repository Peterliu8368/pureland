import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from '../App'

const Home = () => {
    const [data, setData] = useState([])
    const {state, dispatch} = useContext(UserContext)

    useEffect(()=> {
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
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
                                <input type="text" placeholder="add a comment" />
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Home