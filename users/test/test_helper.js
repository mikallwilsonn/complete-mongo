// ----
// Dependencies
const mongoose = require( 'mongoose' );


// ----
// Mongoose Helper setup
before(( done ) => {
    mongoose.Promise = global.Promise;
    mongoose.connect( 'mongodb://localhost/users_test' );
    mongoose.connection
        .once( 'open', () => { done() })
        .on( 'error', ( error ) => {
            console.warn( 'Warning ', error  );
        });
});



// ----
// Mocha, beforeEach test
beforeEach(( done ) => {
    const { users, comments, blogposts } = mongoose.connection.collections;
    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => {
                done();
            });
        });
    });
});