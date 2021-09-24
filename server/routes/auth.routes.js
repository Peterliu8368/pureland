const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: "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"
    }
}))


router.post('/signup', (req, res)=>{
    const {name, email, password, pic} = req.body
    if (!email || !password || !name){
        return res.status(422).json({error:"Please add all the fields"})
    }
    User.find({email: email})
        .then(savedUser=>{
            if(savedUser.length > 0){
                return res.status(422).json({error:"User already exists with that email"})
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword=>{
                    User.create({...req.body, password: hashedPassword})
                    .then(user => {
                            res.json({message: "Successfully created user "})
                            transporter.sendMail({
                                to: user.email,
                                from:"peterliu2357@gmail.com",
                                subject: "Signup success",
                                html:"<h1>Welcome to Pureland, your journey starts.</h1>"
                            }).then((result)=>console.log(result)).catch(err=>console.log(err))
                        })
                    .catch(err=>console.log(err))
                })
        }).
        catch(err=>console.log(err))
})

router.post('/signin', (req, res)=>{
    const {email, password} = req.body
    if (!email || !password) {
        res.status(422).json({message: "Please provide add email or password."})
    }
    User.find({email})
        .then(savedUser=>{
            if(savedUser.length === 0){
                return res.status(422).json({error: "Invalid email or password"})
            }
            bcrypt.compare(password, savedUser[0].password)
                .then(match=>{
                    if(match){
                        const user_id = savedUser[0]._id
                        const token = jwt.sign({_id: user_id}, JWT_SECRET)
                        const {_id, name, email, following, followers, pic} = savedUser[0]
                        res.json({token, user: {_id, name, email, following, followers, pic}})
                    } else {
                        return res.status(422).json({error: "Invalid email or password"})
                    }
                })
                .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
})

module.exports = router;