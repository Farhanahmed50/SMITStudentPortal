const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: [
            true,
            'Please add title for the post'
        ]
    },
    description: {
        type: String,
        required: [
            true,
            'Please add description for the post'
        ]
    },
    imageUrl: {
        type: String,
        required: [
            true,
            'Please add image url for the post'
        ]
    }

}, {
    timestamps: true
}
)

const Posts = mongoose.models.Posts || mongoose.model('Posts', postSchema);

module.exports = Posts