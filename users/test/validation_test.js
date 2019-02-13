// ----
// Dependencies
const assert = require( 'assert' );
const User = require( '../src/user' );


// ----
// Test
describe( 'Validating Records', () => {

    // ----
    it( 'Requires a User Name', ( done ) => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert( message === 'You must provide a name.' );
        done();
    });


    // ----
    it( 'Requires a User Name to be longer than 2 characters.', ( done ) => {
        const user = new User({ name: 'Al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert( message === 'Name must be longer than 2 characters.' );
        done();
    });


    // ----
    it( 'Records that fail validation cannot be saved.', ( done ) => {
        const user = new User({ name: 'Al' });
        user.save().catch(( validationResult ) => {
            const { message } = validationResult.errors.name;

            assert( message === 'Name must be longer than 2 characters.' );
            done();
        });
    });

});
