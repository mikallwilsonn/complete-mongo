// ----
// Dependencies
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const PostSchema = require( './Post' );


// ----
// Schema creation
const UserSchema = new Schema({

    name: {
        type: String,
        validate: {
            validator: ( name ) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [ true, 'You must provide a name.' ]
    },
    posts: [PostSchema],
    likes: {
        type: Number,
        default: 0
    },
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'BlogPost'
    }]

});


// ----
// Virtual Types
UserSchema.virtual( 'postCount' ).get( function() {
    return this.posts.length;
});


// ----
// Middlewares
UserSchema.pre( 'remove', function( next ) {
    const BlogPost = mongoose.model( 'BlogPost' );
    BlogPost.remove({ _id: { $in: this.blogPosts }})
        .then(() => next());
});


// ----
// Model Creation and Export
const User = mongoose.model( 'User', UserSchema );
module.exports = User;
