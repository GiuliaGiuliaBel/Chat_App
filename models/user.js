'use strict';

const mongoose = require('mongoose'),
    {Schema} = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose'),

    userSchema = new Schema( {
        name: {
            first: {
                type: String,
                trim: true
            },
            last: {
                type: String,
                trim: true
            }
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        }, 
        // markers: [{type: Schema.Types.ObjectId, ref: "Marker"}] 
    });
    userSchema.virtual('fullName').get(function() {
        return `${this.name.first} ${this.name.last}`;
    });

    userSchema.plugin(passportLocalMongoose, {
        usernameField: 'email'
    });

module.exports = mongoose.model('User', userSchema);