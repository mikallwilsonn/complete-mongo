const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const PostSchema = require( './Post' );

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


UserSchema.virtual( 'postCount' ).get( function() {
    return this.posts.length;
});


const User = mongoose.model( 'User', UserSchema );

module.exports = User;
