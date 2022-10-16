'use strict';

const express = require('express');
const bodyParser = require('body-parser')
const commonController = require('./controllers/common.controller');

const app = express();
// define the port in a variable incase if we need to change it in the future
const port = 3000;
// defining the index of the built project
const path = __dirname + '/app/dist/';
// separate the routes and the functionality to different files for futre ease of maintainance and improvements
const beerRouter = require('./routes/beer.route');

// configuring express to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// mounting the middleware to intercept for all incoming requests to /api path
app.use("/api/", async (req, res, next) => {
    // record the request in the logs
    await commonController.LogRequest(req);

    // vaildate the request
    const requestResult = commonController.ValidateIncomingRequests(req);
    if (requestResult.isValid) {
        next();
    } else {
        res.status(requestResult.code).json({
            status: requestResult.code,
            result: requestResult.message
        });
    }
})

// setting the beer router to the express app
app.use('/api/beer', beerRouter);

// setting the static webpage to express
app.use(express.static(path));

// host the index page to the get method
app.get('/', (req, res) => {
    res.sendFile(path + "index.html");
});

app.listen(port, async () => {
    try {
        console.log(`Beer-hunt server listening on port ${port}`);
    } catch (error) {
        console.error('Internal Error: ', error);
        process.exit(1);
    }
});
