import React from 'react';
const CreatePost = () => {
    return (
        <div className="card input-filled" style={{
            margin: "3rem auto",
            maxWidth: 550,
            padding: 20,
            textAlign: "center"
        }}>
            <input type="text" placeholder="Title"/>
            <input type="text" placeholder="Body"/>
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button style={{marginTop:"2rem"}} className="btn waves-effect waves-light #26a69a teal lighten-1" type="submit">Create
                </button>
        </div>
    )
}

export default CreatePost