const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const user = mongoose.model("User")
const bcrypt = require('bcryptjs')


router.post('/signup', (req, res)=>{
    const {name, email, password} = req.body
    if (!email || !password || !name){
        return res.status(422).json({error:"please add all the fields"})
    }
    user.find({email: email})
        .then(savedUser=>{
            if(savedUser.length > 0){
                return res.status(422).json({error:"user already exists with that email"})
            }
            bcrypt.hash(password, 12)
                .then(hashedPassword=>{
                    user.create({...req.body, password: hashedPassword})
                    .then(user => res.json({message: "saved successfully"}))
                    .catch(err=>console.log(err))
                })
        }).
        catch(err=>console.log(err))
})

module.exports = router;