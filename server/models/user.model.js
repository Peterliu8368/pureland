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
    following:[{type: ObjectId, ref:"User"}]
})

mongoose.model("User", userSchema)