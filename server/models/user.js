const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: [
            true,
            'Please add a name'
        ]
    },
    email: {
        type: String,
        required: [
            true,
            'Please add a email address'
        ],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [
            true,
            'Please add a password'
        ]
    },
    coursesEnrolled : [
        {
            type: mongoose.Types.ObjectId,
            ref: "Courses",
        }
    ]
},
    {
        timestamps: true
    }
);

const User = mongoose.models.Users || mongoose.model('Users', userSchema);

module.exports = User