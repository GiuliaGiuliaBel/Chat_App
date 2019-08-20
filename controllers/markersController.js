'use strict';

const Marker = require('../models/marker');

module.exports = {
    markers: (req, res, next) => {
            Marker.find()
              .then( markers=> {
                  res.locals.markers = markers;
                  next();
              })
              .catch(error => {
                  console.log(`Error fething: ${error.message}`);
                  next(error);
              });
        },

    markersView: (req, res) => {
        if(req.query.type === 'json') {
          res.json(res.locals.markers)
        } else {
          res.render('users/markers')
        }  
    },

    markersMethod: (req, res, next) => {
        let userId = req.params.id;
        let data;
        data= req.body.coordinates
            Marker.create({
                coordinates: 
                    data,
                user: 
                    userId,      
         })
            .catch(error => {
                console.log(`Error fething user by ID: ${error.message}`);
                next(error);
          })
     },
}