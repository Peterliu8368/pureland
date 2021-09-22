const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");

router.get('/allpost', requireLogin, (req, res)=>{
    Post.find()
    .populate('postedBy', "_id name")
        .then(posts=>{
            res.json({posts})
        })
        .catch(err=> console.log(err))
})

router.post('/createpost', requireLogin, (req, res)=>{
    const {title, body, photoUrl} = req.body;
    if (!title || !body || !photoUrl){
        return res.status(422).json({error:"Please add all the required fields"})
    }
    req.user.password = undefined
    Post.create({
        title,
        body,
        photoUrl,
        postedBy: req.user
    })
        .then(result => {
            res.json({post: result})
        })
        .catch(err=>console.log(err))
})

router.get('/mypost', requireLogin, (req, res)=>{
    Post.find({postedBy: req.user._id})
        .populate('postedBy', "_id name")
        .then(myPosts => {
            res.json({myPosts})
        })
        .catch(err => console.log(err))
})

module.exports = router