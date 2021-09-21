const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const user = mongoose.model("User")

router.get('/', (req, res)=>{
    res.send("Hello")
})

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
            user.create(req.body)
                .then(user => res.json({message: "saved successfully"}))
                .catch(err=>console.log(err))
        }).
        catch(err=>console.log(err))
})

module.exports = router;