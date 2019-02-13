// ----
// Dependencies
const assert = require( 'assert' );
const User = require( '../src/User' );


// ----
// Tests
describe( 'Virtual Types', () => {
    
    // ----
    it( 'postCount returns number of posts', ( done ) => {
        const joe = new User({
            name: 'Joe',
            posts: [{ title: 'A Post Title' }]
        });

        joe.save()
            .then(() => User.findOne({ name: 'Joe' }))
            .then(( user ) => {
                assert( user.postCount === 1 );
                done();
            });
    });

});



/*

// ----
it( '', ( done ) => {});

*/