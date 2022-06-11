const jwt = require('jsonwebtoken');
const User = require('../models/user');

const SECRET = "nnkjkGJHGnmnkjKG"

exports.protectedRoutes = async (req, res, next) => {
    let token;

    if (req.headers.authorization) {
        try {
            token = req.headers.authorization
            const decoded = jwt.verify(token, SECRET);
            req.user = await User.findById(decoded.id).select('-password')
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({
                message : "Not authorized"
            })
        }

    }
    if(!token) {
        res.status(401).json({
            message : "Not Authorized, no token"
        })
    }
}