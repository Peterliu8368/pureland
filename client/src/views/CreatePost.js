import React, { useState, useEffect } from 'react';
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'

const CreatePost = () => {
    const[title, setTitle] = useState("");
    const[body, setBody] = useState("");
    const[image, setImage] = useState("");
    const[url, setUrl] = useState("");
    const history = useHistory();

    useEffect(()=> {
        if (url) {
            //create post once url is set
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "Application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    photoUrl: url
                })
            }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error, classes:"#b71c1c red darken-4"})
                }
                else {
                    M.toast({html: "Post created successfully", classes:"#43a047 green darken-1"})
                    history.push('/')
                }
            })
            .catch(err=>console.log(err))
        }
    }, [url])

    const postDetails =() => {
        //upload user image to cloud
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset', 'pureland')
        data.append('cloud_name', 'pureland-images')
        fetch("https://api.cloudinary.com/v1_1/pureland-images/image/upload", {
            method: "post",
            body: data
        }).then(res=>res.json())
        .then(data=>{
            setUrl(data.secure_url);
            console.log(data);
            
        })
        .catch(err=>console.log(err))

    }

    return (
        <div className="card input-filled" style={{
            margin: "3rem auto",
            maxWidth: 550,
            padding: 20,
            textAlign: "center"
        }}>
            <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
            <input type="text" placeholder="Body" value={body} onChange={e=>setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" onChange={e=>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button onClick={()=>postDetails()} style={{marginTop:"2rem"}} className="btn waves-effect waves-light #26a69a teal lighten-1" type="submit">Create
                </button>
        </div>
    )
}

export default CreatePost