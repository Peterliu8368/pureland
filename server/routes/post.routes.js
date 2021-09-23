const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");

router.get('/allpost', requireLogin, (req, res)=>{
    Post.find()
    .populate('postedBy', "_id name pic")
    .populate('comments.postedBy', '_id name')
        .then(posts=>{
            res.json({posts})
        })
        .catch(err=> console.log(err))
})

router.get('/getSubpost', requireLogin, (req, res)=>{
    Post.find({postedBy: {$in: req.user.following}})
    .populate('postedBy', "_id name pic")
    .populate('comments.postedBy', '_id name')
        .then(posts=>{
            res.json({posts})
        })
        .catch(err=> console.log(err))
})

router.post('/createpost', requireLogin, (req, res)=>{
    const {body, photoUrl} = req.body;
    if (!body || !photoUrl){
        return res.status(422).json({error:"Please add all the required fields"})
    }
    req.user.password = undefined
    Post.create({
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
        .populate('postedBy', "_id name pic")
        .then(myPosts => {
            res.json({myPosts})
        })
        .catch(err => console.log(err))
})

router.put('/like', requireLogin, (req, res)=> {
    Post.findByIdAndUpdate(req.body.postId, {
        $push:{likes:req.user._id}
    }, {
        new: true
    }).populate('postedBy', "_id name pic")
    .populate('comments.postedBy', '_id name').exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        }
        else {
            res.json(result)
        }
    })
})

router.put('/unlike', requireLogin, (req, res)=> {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull:{likes:req.user._id}
    }, {
        new: true
    }).populate('postedBy', "_id name pic")
    .populate('comments.postedBy', '_id name').exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        }
        else {
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin, (req, res)=> {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        $push:{comments:comment}
    }, {
        new: true
    }).populate("comments.postedBy", "_id name pic")
    .populate("postedBy", "_id name pic")
    .exec((err, result) => {
        if (err) {
            return res.status(422).json({error: err})
        }
        else {
            res.json(result)
        }
    })
})

router.delete('/deletepost/:postId',requireLogin, (req, res)=>{
    Post.findByIdAndDelete(req.params.postId)
        .then(result=>{
            res.json({message: "Successfully deleted", result})
        }).catch(err=>console.log(err))
    
})
module.exports = router