// ----
// Dependencies
const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const app = express();
const routes = require( './routes/routes' );
const mongoose = require( 'mongoose' );


// ----
// Database
mongoose.Promise = global.Promise;
if ( process.env.NODE_ENV !== 'test' ) {
    mongoose.connect( 'mongodb://localhost/muber', { useNewUrlParser: true });
}


// ----
// Models
require( './models/Driver' );


// ----
// Middlewares
app.use( bodyParser.json() );


// ----
// Routes
routes( app );


// ----
// More Middlewares
app.use(( error, req, res, next ) => {
    res.status( 422 ).send({ error: error.message })
    next();
});


// ----
module.exports = app;
