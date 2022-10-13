'use strict';

const express = require('express');

const app = express();
const port = 3000;

const beerRouter = require('./routes/beer.route');

app.use('/api/beer', beerRouter);

app.listen(port, async () => {
    try {
        console.log(`Beer-hunt server listening on port ${port}`);
    } catch (error) {
        console.log('There was an error connecting to DB', error);
        process.exit(1);
    }
});
