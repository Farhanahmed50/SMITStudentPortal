const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/routes')
const dbConnection = require('./models/dbConnection');
const adminRoutes = require('./routes/adminRoutes')
const courseRoutes = require('./routes/courseRoutes')
const postRoutes = require('./routes/postRoutes')
require("dotenv").config();


dbConnection();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/admin", adminRoutes);
app.use("/course", courseRoutes);
app.use("/post", postRoutes);

const PORT = process.env.PORT || 5000;

routes(app);

app.listen(PORT, () => {
    console.log(`Server has been started on port : http://localhost:${PORT}/`)
})