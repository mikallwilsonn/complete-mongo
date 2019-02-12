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
    mongoose.connection.collections.users.drop(() => {
        // Ready to run next test
        done();
    });
});