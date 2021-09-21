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
        default: "no photo"
    },
    //postedBy will be related to a User model, the filled with the objectID
    postedBy: {
        type: ObjectId,
        ref: "User"
    }
})

mongoose.model("Post", postSchema)