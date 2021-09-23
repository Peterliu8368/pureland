const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "{PATH} is required"]
    },
    email:{
        type: String,
        required: [true, "{PATH} is required"]
    },
    password:{
        type: String,
        required: [true, "{PATH} is required"]
    },
    followers:[{type: ObjectId, ref:"User"}],
    following:[{type: ObjectId, ref:"User"}],
    pic: {
        type: String,
        default: "https://res.cloudinary.com/pureland-images/image/upload/v1632432713/138-1387631_login-comments-windows-10-person-icon_cbjsiw.jpg"
    }
})

mongoose.model("User", userSchema)