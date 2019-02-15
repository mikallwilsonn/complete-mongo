// ----
// Dependencies
const mongoose = require( 'mongoose' );


// ----
// Models
const Driver = require( '../models/Driver' );


// ----
module.exports = {

    // ----
    greeting( req, res ) {
        res.send({ hello: 'world!' });
    },


    // ----
    index( req, res, next ) {

        const { lng, lat } = req.query;
        Driver.geoSearch(
            { type: 'Point', coordinates: [ parseFloat(lng), parseFloat(lat) ]},
            { spherical: true, maxDistance: 200000  })
                .then(( drivers ) => res.send( drivers ))
                .catch( next );
    },

    // ----
    create( req, res, next ) {
        const driverProps = req.body;
        
        Driver.create( driverProps )
            .then(( driver ) => res.send( driver ))
            .catch( next );
    },


    // ----
    edit( req, res, next ) {
        const driverProps = req.body;
        const driver_id = req.params.id;

        Driver.findByIdAndUpdate( driver_id, driverProps )
            .then(() => Driver.findById( driver_id ))
            .then(( driver ) => res.send( driver ))
            .catch( next );
    },


    // ----
    delete( req, res, next ) {
        const driver_id = req.params.id;

        Driver.findByIdAndDelete( driver_id )
            .then(( driver ) => res.status( 204 ).send( driver ))
            .catch( next )
    },


}