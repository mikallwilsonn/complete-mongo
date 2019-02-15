// ----
// Dependencies
const assert = require( 'assert' );
const mongoose = require( 'mongoose' );
const request = require( 'supertest' );
const app = require( '../../app' );


// ----
// Models
const Driver = mongoose.model( 'Driver' );


// ----
// Tests
describe( 'DriversController', () => {

    // ----
    it( 'posts to /api/drivers will create a new Driver', ( done ) => {
        Driver.countDocuments().then(( count ) => {
            request( app )
                .post( '/api/drivers' )
                .send({ email: 'create@test.com' })
                .end(() => {
                    Driver.countDocuments().then(( newCount ) => {
                        assert( count + 1 === newCount );
                        done();
                    });
            });
        });
    });


    // ----
    it( 'Makes a successful PUT request to /api/drivers to edit a Driver', ( done ) => {
        const driver = new Driver({ email: 'edit@test.com', driving: false  });
        driver.save()
            .then(() => {
                request( app )
                    .put( `/api/drivers/${driver._id}` )
                    .send({ driving: true })
                    .end(() => Driver.findOne({ email: 'edit@test.com' })
                        .then(( driver ) => {
                            assert( driver.driving === true );
                            done();
                        }))
        });
    });


    // ----
    it( 'Makes a sucessful DELETE request to /api/drivers and deletes a Driver', ( done ) => {
        const driver = new Driver({ email: 'delete@test.com' });
        driver.save()
            .then(() => {
                request( app )
                    .delete( `/api/drivers/${driver._id}` )
                    .end(() => Driver.findOne({ email: 'delete@test.com' })
                        .then(( driver ) => {
                            assert( driver === null );
                            done();
                        }))
        }); 
    });


    // ----
    it( 'Makes a successful GET request to find all Drivers near a locaion.', ( done ) => {
        const seattleDriver = new Driver({ 
            email: 'seattle@test.com',
            gemotry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
        });

        const miamiDriver = new Driver({
            email: 'miami@test.com',
            geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
        });

        Promise.all([
            seattleDriver.save(),
            miamiDriver.save()
        ]).then(() => {
            request( app )
                .get( '/api/drivers?lng=-80&lat=25' )
                .end(( error, response ) => {
                    console.log( response.body );
                    //assert( response.body.length === 1 );
                    //assert( response.body[0].obj.email === 'miami@test.com' );
                    done();
                })
        });
    });

});