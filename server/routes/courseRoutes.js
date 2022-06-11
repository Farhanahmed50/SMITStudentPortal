const express = require('express')
const courseController = require('../controllers/courseController')
const adminProtectedRoute = require('../middleware/adminProtectedRoute')
const userProtectedRoute = require('../middleware/userProtectedRoute')

const app = express.Router();

app.get("/", (req, res) => {
    res.send("Course Route");
})
app.post("/add", adminProtectedRoute.protectedRoute, courseController.add)
app.patch("/update/:id", adminProtectedRoute.protectedRoute, courseController.update)
app.get("/allCourses", courseController.fetchAll)
app.patch("/enroll/:courseId", userProtectedRoute.protectedRoute, courseController.enroll)
app.get("/findCourse/:courseId", adminProtectedRoute.protectedRoute, courseController.findCourse)


module.exports = app