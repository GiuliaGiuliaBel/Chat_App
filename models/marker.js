'use strict';

const mongoose = require('mongoose'),
    {Schema} = require('mongoose'),
    markerSchema = new Schema({
        coordinates: {
            type: {Number},
            required: true
    },
        user: {
        type: Schema.Types.ObjectId,
        required: true    
    },
});

module.exports = mongoose.model('Marker', markerSchema);