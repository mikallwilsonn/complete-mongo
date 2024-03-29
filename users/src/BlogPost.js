const mongoose = require( 'mongoose' );
const { Schema } = mongoose;


const BlogPostSchema = new Schema({
    title: String,
    content: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const BlogPost = mongoose.model( 'BlogPost', BlogPostSchema );

module.exports = BlogPost;
