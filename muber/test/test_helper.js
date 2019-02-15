// ----
// Dependencies
const mongoose = require( 'mongoose' );


// ----
// Mongoose Helper setup
before(( done ) => {
    mongoose.Promise = global.Promise;
    mongoose.connect( 'mongodb://localhost/muber_test', { useNewUrlParser: true });
    mongoose.connection
        .once( 'open', () => { done() })
        .on( 'error', ( error ) => {
            console.warn( 'Warning ', error  );
        });
});


// ----
// Mocha, beforeEach test
beforeEach(( done ) => {
    const { drivers } = mongoose.connection.collections;
    drivers.drop()
        .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' }))
        .then(() => done())
        .catch(() => done());
});
