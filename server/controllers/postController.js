const Posts = require("../models/post");
const mongoose = require('mongoose');

exports.addPost = async (req, res) => {
    const { title, description, imageUrl } = req.body;

    const post = new Posts({
        title,
        description,
        imageUrl
    })
    post.save().then(() => {
        res.status(201).json({
            message: "Post add Successfully"
        })
    }).catch((error) => {
        res.json({
            message: "Something went wrong",
            error: error.message
        })
    })
}

exports.fetchAll = async (req, res) => {
    const posts = await Posts.find();
    try {
        if (posts) {
            res.status(201).json({
                posts
            })
        }
    } catch (error) {
        res.json({ message: error.message, code: error.code })
    }
}

exports.updatePost = async (req, res) => {
    const { title, description, imageUrl } = req.body;

    const postData = {
        title,
        description,
        imageUrl
    }
    try {
        await Posts.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, postData)
            .then(() => {
                res.status(201).json({
                    message: "Post Updated Successfully"
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: "Something went wrong",
                    error: error.message
                })
            })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong"
        })
    }
}

exports.deletePost = async (req, res) => {
    try {
        await Posts.findByIdAndDelete({ _id: mongoose.Types.ObjectId(req.params.id) })
            .then(() => {
                res.status(201).json({
                    message: "Post Deleted Successfully"
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: "Something went wrong",
                    error: error.message
                })
            })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong"
        })
    }
}

exports.findPost = async (req, res) => {
    try {
        const post = await Posts.findById({ _id: mongoose.Types.ObjectId(req.params.id) }).exec()
        res.status(201).json({
            post
        })
    } catch (error) {
        res.status(404).json({
            message: "Post not found",
            error
        })
    }

}