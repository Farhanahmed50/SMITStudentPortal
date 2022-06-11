const express = require('express')
const adminController = require('../controllers/adminController')
const adminProtectedRoute = require('../middleware/adminProtectedRoute')

const app = express.Router();

app.get("/", (req, res) => {
    res.send("Admin Route");
})
app.post("/login", adminController.adminLogin)
app.post("/signup", adminController.adminSignup)


module.exports = app