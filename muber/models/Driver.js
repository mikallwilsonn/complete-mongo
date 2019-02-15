const mongoose = require( 'mongoose' );
const { Schema } = mongoose;


const PointSchema = new Schema({
    type: {
        type: String,
        defualt: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dSphere'
    }
});


const DriverSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    driving: {
        type: Boolean,
        default: false
    },
    location: String,
    geometry: PointSchema
});


const Driver = mongoose.model( 'Driver', DriverSchema );
module.exports = Driver;
