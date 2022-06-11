const Admin = require('../models/admin')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const SECRET = "nnkjkGJHGnmnkjKG"

const generateToken = (id) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: '30d'
    })
}

exports.adminLogin = async (req, res) => {
    const { adminEmail, adminPassword } = req.body;
    const admin = await Admin.findOne({ adminEmail });
    if (!adminEmail) {
        res.status(400).json({
            message: "Email not registered."
        })
    }
    if (admin && (await bcrypt.compare(adminPassword, admin.adminPassword))) {
        res.status(201).json({
            message: "Successfull Login Admin",
            token: generateToken(admin._id)
        })
    }
    else {
        res.status(400).json({
            message: "Invalid Email or Password"
        })
    }
}

exports.adminSignup = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.adminPassword, salt)

    const admin = new Admin({
        adminName: req.body.adminName,
        adminEmail: req.body.adminEmail,
        adminPassword: hashedPassword
    })
    admin.save()
        .then(() => {
            res.status(201).json({ message: "Signup Successfully" })
        })
        .catch((error) => {
            if (error.code == 11000) {
                res.json({ message: "Email is already registered" })
            }
            else {
                res.json({ message: error.message })
            }
        })
}