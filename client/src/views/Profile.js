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

    const updatePhoto = () =>{
        //upload user profile image to cloud
        // const data = new FormData()
        // data.append('file', image)
        // data.append('upload_preset', 'pureland')
        // data.append('cloud_name', 'pureland-images')
        // fetch("https://api.cloudinary.com/v1_1/pureland-images/image/upload", {
        //     method: "post",
        //     body: data
        // }).then(res=>res.json())
        // .then(data=>{
        //     setUrl(data.secure_url);
        //     console.log(data);
            
        // })
        // .catch(err=>console.log(err))
    }

    return (
        <div style={{maxWidth:"69vw", margin: "0 auto"}}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                margin: "18px 0px",
                borderBottom: "1px solid gray"
            }}>
                <div style={{display: 'flex', flexDirection:"column", alignItems:'center'}}>
                    <img style={{width:160, height:160, borderRadius:80}} src={state?.pic} alt="profile-pic" />
                    {/* update button */}
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Profile Pic</span>
                            <input type="file" />
                        </div>
                        
                    </div>
                </div>
                <div style={{display: 'flex', flexDirection:"column", alignItems:'start', justifyContent:'center'}}>
                    <h4>{state?.name}</h4>
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