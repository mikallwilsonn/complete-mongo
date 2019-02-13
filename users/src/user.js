const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const postSchema = require( './post' );

const UserSchema = new Schema({

    name: {
        type: String,
        validate: {
            validator: ( name ) => name.length > 2,
            message: 'Name must be longer than 2 characters.'
        },
        required: [ true, 'You must provide a name.' ]
    },
    posts: [postSchema],
    likes: {
        type: Number,
        default: 0
    }

});


UserSchema.virtual( 'postCount' ).get( function() {
    return this.posts.length;
});


const User = mongoose.model( 'user', UserSchema );

module.exports = User;
