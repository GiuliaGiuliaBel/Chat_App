'use strict';

const express = require('express'),
    layouts = require('express-ejs-layouts'),
    app = express(),
    router = require('./routes/index'),

    connectFlash = require('connect-flash'),
    passport = require('passport'),
    User = require('./models/user'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),

    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    
    mongoose.connect('mongodb://localhost/chat_app');
    app.set( 'port', process.env.PORT || 3000 );
    app.set( 'view engine', 'ejs' );

    app.use(cookieParser('secret_password'));
    app.use(expressSession({
        secret: 'secret_passcode',
        cookie: {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    }));
    const db = mongoose.connection;

    db.once('open', () => {
        console.log('Succesfully connected to DB');
    });
    
    app.use( layouts );
    app.use( express.static( 'public' ) ),

    app.use( bodyParser.urlencoded( {
        extended: false
      } ) );
    app.use( bodyParser.json() );
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    
    app.use(connectFlash()); 
    
    app.use((req, res, next) => {
        res.locals.flashMessages = req.flash();
        res.locals.loggedIn = req.isAuthenticated();
        res.locals.currentUser = req.user;
        next();
    });
   
    app.get('/', (req, res) => {
        res.render('index');
    });

    app.use('/', router);

    const server =
     app.listen(app.get('port'), () => {
        console.log(`Server running at http://localhost:${app.get('port')}`);
    });

    const io = require('socket.io')(server);
    require('./controllers/chatController')(io);
