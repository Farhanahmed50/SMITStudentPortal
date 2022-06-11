const User = require('../models/user')
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const SECRET = "nnkjkGJHGnmnkjKG"

const generateToken = (id) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: '30d'
    })
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            message : "Successfull Login",
            token : generateToken(user._id)
        })
    }
    else{
        res.status(400).json({
            message : "Invalid Email or Password"
        })
    }

}

exports.signup = async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    user.save()
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

exports.logout = async (req, res) => {
}

