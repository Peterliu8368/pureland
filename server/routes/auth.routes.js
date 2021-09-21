const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.post('/signup', (req, res)=>{
    const {name, email, password} = req.body
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
                    .then(user => res.json({message: "Saved successfully"}))
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
                        // res.json({message: "Successfully signed-in"})
                        const user_id = savedUser[0]._id
                        const token = jwt.sign({_id: user_id}, JWT_SECRET)
                        res.json({token})
                    } else {
                        return res.status(422).json({error: "Invalid email or password"})
                    }
                })
                .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err))
})

module.exports = router;