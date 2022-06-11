// const userController = require('../controllers/user')
// const { protectedRoutes } = require('../middleware/authMiddleware');
const User = require('../models/user');
const userController = require('../controllers/userController')
const userProtectedRoute = require('../middleware/userProtectedRoute');

const routes = (app) => {
    app.get('/', (req, res) => {
        res.send('Alhamdulillah');
    })
    app.post("/login", userController.login)
    app.post("/signup", userController.signup)
    app.post("/auth", userProtectedRoute.protectedRoute,(req, res) => {
        let user;
        try {
            user = req.user;
            res.status(201).json(user)
        } catch (error) {
            res.json({
                message : "Not Authorized"
            })
        }
    })
}

module.exports = routes