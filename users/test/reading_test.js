// ----
// Dependencies
const assert = require( 'assert' );
const User = require( '../src/user' );


// ----
// Test
describe( 'Reading users out of the database', () => {
    let joe;

    beforeEach(( done ) => {
        joe = new User({ name: 'Joe' });
        joe.save().then(() => { done() });
    });


    // ----
    it( 'finds all users with the name of joe', ( done ) => {
        User.find({ name: 'Joe' }).then(( users ) => {
            assert( users[0]._id.toString() === joe._id.toString() );
            done();
        });
    });


    // ----
    it( 'find a user with a particular _id', ( done ) => {
        User.findOne({ _id: joe._id }).then(( user ) => {
            assert( user.name === 'Joe' );
            done();
        });
    });
}); 
