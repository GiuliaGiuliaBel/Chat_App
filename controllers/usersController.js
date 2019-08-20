'use strict';

const User = require('../models/user'),
    passport = require('passport'),
    getUserParams = (body) => {
        return {
            name: {
                first: body.first,
                last: body.last
            },
            email: body.email,
            password: body.password
    };
  };

  module.exports = {
      index: (req, res, next) => {
          User.find()
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fething users: ${error.message}`);
                next(error);
            });
      },
      
      indexView: (req, res) => {
        if(req.query.type === 'json') {
            res.json(res.locals.users)
        } else {
            res.render('users/index');
        }
      },

      create: (req, res, next) => {
        if(req.skip) next();
        let newUser = new User(getUserParams(req.body));

        User.register(newUser, req.body.password, (error, user) => {
            if(user) {
                req.flash('success', `${user.fullName}'s account created successfully!`);
                res.locals.redirect = `/users/${user._id}`;
                next();
            } else {
                req.flash('error', `Failed to create user because: ${error.message}.`);
                res.locals.redirect = '/users/new';
                next();
            }
        });
      },

      authenticate: passport.authenticate('local', {
          failureRedirect: '/users/login',
          failureFlash: 'Failed to login.',
          successRedirect: '/',
          successFlash: 'Logged in!'
      }),

      logout: (req, res, next) => {
          req.logout();
          req.flash('success', 'You have been logged out!');
          res.locals.redirect = '/';
          next();
      },
      
      new: (req, res) => {
          res.render('users/new')
      },
  
      show: (req, res, next) => {
          let userId = req.params.id;
          User.findById(userId)
            .then(user => {
                res.locals.user = user;
                next();
            })
            .catch(error => {
                console.log(`Error fething user by ID: ${error.message}`);
                next(error);
            });
      },

      showView: (req, res) => {
          res.render('users/show');
      },
 
      chat: (req, res) => {
        res.render('chat');         
      },
      
      redirectView: (req, res, next) => {
          let redirectPath = res.locals.redirect;
          if( redirectPath !== undefined ) res.redirect(redirectPath);
          else next();
      },
      
      login: (req, res) => {
          res.render('users/login');
      },
  }