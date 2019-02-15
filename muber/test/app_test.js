const assert = require( 'assert' );
// ----
// Dependencies
const request = require( 'supertest' );
const app = require( '../app' );


// ----
// Tests
describe( 'The Express Application', () => {

    // ----
    it('handles a GET request to /api', ( done ) => {
        request( app )
            .get( '/api' )
            .end(( error, response ) => {
                assert( response.body.hello === 'world!' );
                done();
            });
        
    });
});
