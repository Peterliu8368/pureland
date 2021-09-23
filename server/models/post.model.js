const mongoose = require("mongoose");
//build relation in mongo db
const {ObjectId} = mongoose.Schema.Types

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true, "{PATH} is required"]
    },
    body:{
        type: String,
        required: [true, "{PATH} is required"]
    },
    photoUrl:{
        type: String,
        required: [true, "{PATH} is required"]
    },
    likes: [{
        type: ObjectId,
        ref: "User",
    }],
    comments: [{
        text: String,
        postedBy: {type: ObjectId, ref:"User"}
    }],
    //postedBy will be related to a User model, the filled with the objectID
    postedBy: {
        type: ObjectId,
        ref: "User",
        required: [true, "{PATH} is required"]
    }
})

mongoose.model("Post", postSchema)