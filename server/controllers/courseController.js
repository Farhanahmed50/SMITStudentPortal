const mongoose = require('mongoose');
const Course = require('../models/course');
const User = require('../models/user')

exports.add = (req, res) => {
    const { courseName, instructorName, duration, price, status, image, enrolledStudents } = req.body;
    const course = new Course({
        courseName,
        instructorName,
        duration,
        price,
        status,
        image,
        enrolledStudents
    })
    course.save()
        .then(() => {
            res.status(201).json({ message: "Course Add Successfully" })
        })
        .catch((error) => {
            res.json({ message: error.message, code: error.code })
        })
}

exports.update = async (req, res) => {
    const { courseName, instructorName, status, enrolledStudents } = req.body;

    const course = {
        courseName,
        instructorName,
        status,
        enrolledStudents
    }
    try {
        await Course.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.id) }, course)
            .then(() => {
                res.status(201).json({
                    message: "Course Updated Successfully"
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: "Something went wrong"
                })
            })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong"
        })
    }
    // course.save()
    //     .then(() => {
    //         res.status(201).json({ message: "Course Update Successfully" })
    //     })
    //     .catch((error) => {
    //         res.json({ message: error.message, code: error.code })
    //     })
}

exports.fetchAll = async (req, res) => {
    const courses = await Course.find();
    try {
        if (courses) {
            res.status(201).json({
                courses
            })
        }
    } catch (error) {
        res.json({ message: error.message, code: error.code })
    }
}
exports.enroll = async (req, res) => {
    try {
        await User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.user._id) }, { coursesEnrolled: req.params.courseId })
        await Course.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.courseId) }, { enrolledStudents: mongoose.Types.ObjectId(req.user._id) })
        res.status(201).json({
            message: "Successfully Enrolled"
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong"
        })
    }
    // const user = new User.findById(req.user._id);
    // const course = new Course.findById(req.params.courseId);
}

exports.findCourse = async (req, res) => {
    const { courseName, instructorName, status } = req.body;
    try {
        const course = await Course.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(req.params.courseId) }, {
            courseName,
            instructorName,
            status
        })
        res.status(201).json({
            course: course,
        })
    } catch (error) {
        res.status(400).json({
            message: "Something went wrong"
        })
    }
}