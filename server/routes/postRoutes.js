const express = require('express')
const courseController = require('../controllers/courseController')
const postController = require('../controllers/postController')
const adminProtectedRoute = require('../middleware/adminProtectedRoute')
const userProtectedRoute = require('../middleware/userProtectedRoute')

const app = express.Router();

app.get("/", (req, res) => {
    res.send("Course Route");
})
app.post("/add", adminProtectedRoute.protectedRoute, postController.addPost)
app.patch("/update/:id", adminProtectedRoute.protectedRoute, postController.updatePost)
app.delete("/delete/:id", adminProtectedRoute.protectedRoute, postController.deletePost)
app.get("/fetchAll", postController.fetchAll)
app.get("/adminFetchAll", adminProtectedRoute.protectedRoute ,postController.fetchAll)
app.get("/findPost/:id", adminProtectedRoute.protectedRoute, postController.findPost)




module.exports = app