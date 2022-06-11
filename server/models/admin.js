const mongoose = require('mongoose');

const { Schema } = mongoose;

const adminSchema = new Schema({
    adminName: {
        type: String,
        required: [
            true,
            'Please add a name'
        ]
    },
    adminEmail: {
        type: String,
        required: [
            true,
            'Please add a email address'
        ],
        unique: true
    },
    adminPassword: {
        type: String,
        required: [
            true,
            'Please add a password'
        ]
    }
},
    {
        timestamps: true
    }
);

const Admin = mongoose.model('Admins', adminSchema);

module.exports = Admin