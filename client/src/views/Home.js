import React, {useState, useEffect} from 'react'

const Home = () => {
    const [data, setData] = useState([])
    useEffect(()=> {
        fetch('/allpost', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    }, [])

    return (
        <div className="home">
            {
                data.map(item=>{
                    return (
                        <div key={item._id} className="card home-card">
                            <h5 className="userName">{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img src={item.photoUrl} alt="maclaren" />
                            </div>
                            <div className="card-content">
                                <i style={{color:'red'}} className="material-icons">favorite</i>
                                <h6>Title</h6>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate porro placeat, molestias ea veniam maxime adipisci harum vero non blanditiis architecto sequi, vel accusantium fugit. Est expedita omnis aspernatur unde.</p>
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