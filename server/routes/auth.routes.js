const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
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

router.post('/reset-password', (req, res)=>{
    crypto.randomBytes(32, (err, buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email: req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error: "User do not exist"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 1800000
            user.save().then((result)=>{
                transporter.sendMail({
                    to: user.email,
                    from: "peterliu2357@gmail.com",
                    subject: "Password Reset",
                    html: `
                    <p>You have requested password reset</p>
                    <h5>Click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                }).then(result=>console.log(result)).catch(err=>console.log(err))
                res.json({message: "Check your email for reset link"})
            })
        })
    })
})

router.post('/new-password', (req, res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken: sentToken, expireToken:{$gt: Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword, 12)
        .then(hashedPassword=>{
            user.password = hashedPassword
            user.resetToken = undefined
            user.expireToken = undefined
            user.save().then(savedUser=>{
                res.json({message: "Password update success"})
            }).catch(err=>console.log(err))
        })
    })
})

module.exports = router;