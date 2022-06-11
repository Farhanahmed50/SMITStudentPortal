const mongoose = require('mongoose');

const { Schema } = mongoose;

const courseSchema = new Schema({
    courseName: {
        type: String,
        required: [
            true,
            'Please add a Course Name'
        ]
    },
    instructorName: {
        type: String,
        required: [
            true,
            'Please add a Instructor Name'
        ]
    },
    duration: {
        type: String,
        required: [
            true,
            'Please add Duration'
        ]
    },
    price: {
        type: String,
        required: [
            true,
            'Please add market price'
        ]
    },
    status: {
        type: Boolean,
        required: [
            true,
            'Please fill a field'
        ]
    },
    image: {
        type: String,
        required: [
            true,
            'Please add image'
        ]
    },
    enrolledStudents : [
        {
            type: mongoose.Types.ObjectId,
            ref: "Users",
        }
    ]
},
    {
        timestamps: true
    }
);

const Course = mongoose.model('Courses', courseSchema);

module.exports = Course