const mongoose = require("mongoose");

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
    }
})

mongoose.model("User", userSchema)