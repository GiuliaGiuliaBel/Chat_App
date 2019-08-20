'use strict';

const httpStatus = require('http-status-codes');

module.exports = {
    pageNotFound: (req, res) => {
        res.status(httpStatus.NOT_FOUND);
        res.render('error');
    },
    
}