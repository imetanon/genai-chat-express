/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.session.isAuthenticated) {
        // User is authenticated, render the page with user information
        res.render('index', {
            title: 'CGS - Generative AI Chatbot',
            isAuthenticated: req.session.isAuthenticated,
            username: req.session.account?.username,
            name: req.session.account?.name,
            timestamp: Date.now() 
        });
    } else {
        // User is not authenticated, redirect to the authentication page
        res.redirect('/auth/signin'); // Adjust the path to your authentication route
    }
});

router.get('/amity', function (req, res, next) {
    res.render('amity', {
        title: 'CGS - Generative AI Chatbot',
        username: 'AMITY@SCG.COM',
        name: 'AMITY'
    })
});

module.exports = router;