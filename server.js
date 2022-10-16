'use strict';

import express from 'express'
import bodyParser from 'body-parser';
import commonController from './controllers/common.controller.js';
import path from 'path';
import { fileURLToPath } from 'url';
import history from 'connect-history-api-fallback'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// define the port in a variable incase if we need to change it in the future
const port = 3000;

// defining the index of the built project
const distpath = __dirname + '/app/dist/';

// separate the routes and the functionality to different files for futre ease of maintainance and improvements
import beerRouter from './routes/beer.route.js'

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
const staticFileMiddleware = express.static(path.join(distpath))
app.use(staticFileMiddleware)
app.use(history())
app.use(staticFileMiddleware)

// serving the index as the landing page
app.get('/', (req, res) => {
    res.render(path.join(distpath + '/index.html'))
})

app.listen(port, async () => {
    try {
        console.log(`Beer-hunt server listening on port ${port}`);
    } catch (error) {
        console.error('Internal Error: ', error);
        process.exit(1);
    }
});
