'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const commonCtrl = require('./controllers/common.controller');

const app = express();
// define the port in a variable incase if we need to change it in the future
const port = 3000;

// configuring express to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mounting the middleware interceptor for all incoming requests
app.use((req, res, next) => {
    // record the request in the logs
    commonCtrl.LogRequest(req);

    // vaildate the request
    const requestResult = commonCtrl.ValidateIncomingRequests(req);
    if (requestResult.isValid) {
        next();
    } else {
        res.status(requestResult.code).json({
            status: requestResult.code,
            result: requestResult.message
        });
    }
})

// separate the routes and the functionality to different files for futre ease of maintainance and improvements
const beerRouter = require('./routes/beer.route');
app.use('/api/beer', beerRouter);

app.listen(port, async () => {
    try {
        console.log(`Beer-hunt server listening on port ${port}`);
    } catch (error) {
        console.error('Internal Error: ', error);
        process.exit(1);
    }
});
