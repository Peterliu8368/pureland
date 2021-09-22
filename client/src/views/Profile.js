import React from 'react'

const Profile = () => {
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
                    <h4>Lily Houston</h4>
                    <div style={{display: 'flex', justifyContent:'space-between', width:"117%"}}>
                        <h6>69 posts</h6>
                        <h6>69 followers</h6>
                        <h6>69 following</h6>
                    </div>
                </div>
            </div>
            
            <div className="gallery">
                <img className="item" src="https://images.unsplash.com/photo-1563283078-63d046631f27?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJpa2luaXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="item" src="https://images.unsplash.com/photo-1563283078-63d046631f27?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJpa2luaXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="item" src="https://images.unsplash.com/photo-1563283078-63d046631f27?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJpa2luaXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="item" src="https://images.unsplash.com/photo-1563283078-63d046631f27?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJpa2luaXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="item" src="https://images.unsplash.com/photo-1563283078-63d046631f27?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJpa2luaXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
                <img className="item" src="https://images.unsplash.com/photo-1563283078-63d046631f27?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGJpa2luaXxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="" />
            </div>
        </div>
    )
}

export default Profile