/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
var router = express.Router();

var fetch = require('../fetch');

var { DATAOCEAN_EMP_ENDPOINT, DATAOCEAN_EMP_TOKEN } = require('../authConfig');

// custom middleware to check auth state
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }

    next();
};


router.get('/profile',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        try {
            // Base API URL
            // const baseUrl = 'https://test-dataocean.scg.com/api/broker/json/c139dff4-a93e-4d1b-97a7-80b5d5063cec';

            // Define the filter (you might want to get these values from req.query or another source)
            const filter = JSON.stringify([
                {
                    "filterList": [req.session.account.username.toUpperCase()],
                    "columnName": "EMAIL",
                    "filterType": "CHECKBOX"
                }
            ]);

            // Construct the full endpoint
            const endpoint = `${DATAOCEAN_EMP_ENDPOINT}?filter=${encodeURIComponent(filter)}`;

            const apiResponse = await fetch(endpoint, DATAOCEAN_EMP_TOKEN);
            
            res.render('do_profile', { profile: apiResponse[0] });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;