const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/SMIT_StudentPortal', { useNewUrlParser: true });
mongoose.connect('mongodb+srv://farhanahmed:farhanahmed@practice.xspt2.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });



const dbConnection = () => {
    mongoose.connection.once('open', () => {
        console.log("MongoDB has been connected.");
    })
};

module.exports = dbConnection