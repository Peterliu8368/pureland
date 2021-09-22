import React from 'react'

const Home = () => {
    return (
        <div className="home">
            <div className="card home-card">
                <h5>Peter</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1593836788196-9fd68e904906?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmlraW5pfGVufDB8MHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="img" />
                </div>
                <div className="card-content">
                    <i style={{color:'red'}} class="material-icons">favorite</i>
                    <h6>Title</h6>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate porro placeat, molestias ea veniam maxime adipisci harum vero non blanditiis architecto sequi, vel accusantium fugit. Est expedita omnis aspernatur unde.</p>
                    <input type="text" placeholder="add a comment" />
                </div>
            </div>
        </div>
    )
}

export default Home