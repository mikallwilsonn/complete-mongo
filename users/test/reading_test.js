// ----
// Dependencies
const assert = require( 'assert' );
const User = require( '../src/User' );


// ----
// Test
describe( 'Reading users out of the database', () => {
    let alex, joe, maria, wendy;

    beforeEach(( done ) => {
        alex = new User({ name: 'Alex' });
        joe = new User({ name: 'Joe' });
        maria = new User({ name: 'Maria' });
        wendy = new User({ name: 'Wendy' }); 
        Promise.all([
            joe.save(),
            alex.save(),
            wendy.save(),
            maria.save()
        ]).then(() => done() );
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


    // ----
    it( 'Can skip and limit the result set', ( done ) => {
        User.find({})
            .sort({ name: 1 })
            .skip( 1 )
            .limit( 2 )
            .then(( users ) => {
                assert( users.length === 2 );
                assert( users[0].name === 'Joe' );
                assert( users[1].name === 'Maria' );
                done();
            })
    });
}); 
