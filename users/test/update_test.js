// ----
// Dependencies
const assert = require( 'assert' );
const User = require( '../src/user' );


// ----
// Test
describe( 'Updating Records', () => {
    let joe;

    beforeEach(( done ) => {
        joe = new User({ name: 'Joe' });
        joe.save().then(() => { done() });
    });

    function assertName( operation, done ) {
        operation.then(() => {
            User.find().then(( users ) => {
                assert( users.length === 1 && users[0].name === 'Alex' );
                done();
            });
        });
    }

    // ----
    it( 'instance type using set and save', ( done ) => {
        joe.set( 'name', 'Alex' );
        assertName( 
            joe.save(), 
            done 
        );
    });

    // ----
    it( 'model instance can update', ( done ) => {
        assertName( 
            joe.update({ name: 'Alex' }), 
            done 
        );
    });

    // ----
    it( 'model class can update', ( done ) => {
        assertName(
            User.update({ name: 'Joe' }, { name: 'Alex' }),
            done
        );
    });

    // ----
    it( 'model class can find one and update', ( done ) => {
        assertName(
            User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
            done
        );
    });

    // ----
    it( 'model class can find one by _id and update', ( done ) => {
        assertName(
            User.findByIdAndUpdate( joe._id, { name: 'Alex' }),
            done
        );
    });

}); 