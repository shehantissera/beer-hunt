'use strict'

var NOSQL = require('nosql');
const commonCtrl = require('./common.controller');

// get the base URL from the config
const config = require('config');
const RATINGS_DB = config.get('RATINGS_DB');

// testcases
// validate input parameter
// validate if the return search query contains understors instead of spaces- test with different inputs
// does the pagination work 1 req per second
// check getDataFromPunkAPI with the result length based on a search param



// this method returns preped search query for the API
const getSearchString = (query) => {

    // not an absolute requirement, but turn to lowercase for neatness
    query = query.toLowerCase();

    // remove all whitespaces in both ends of the query
    query = query.trim();

    // replace all white spaces with an underscore
    query = query.replace(/\s+/g, '_');

    return query;
}

// this method validates the search request
const isSearchRequestValid = (req) => {
    const result = { code: 200, isValid: true, message: "" }

    if (req.query.q === undefined) {
        result.code = 400;
        result.isValid = false;
        result.message = "'q' queryparam is required";
        return result;
    }
    if (req.query.q === "") {
        result.code = 400;
        result.isValid = false;
        result.message = "'q' cannot be empty";
        return result;
    }

    return result;
}


const searchBeerByName = async (req, res) => {
    try {
        // validate the request queryparams
        const reqstat = isSearchRequestValid(req);
        if (!reqstat.isValid) {
            return res.status(reqstat.code).json({
                status: reqstat.code,
                result: reqstat.message
            });
        }

        // prep the search query before invoking API
        const searchString = getSearchString(req.query.q);

        // first invoke the DB, if not call the API
        const data = await commonCtrl.GetDataFromPunkAPI("search", searchString);

        res.json(data);
    } catch (error) {
        console.error('Internal Error: ', error);
        res.sendStatus(500);
    }
};

// this method validates the rate beer request
const isRateRequestValid = async (req) => {
    const result = { code: 200, isValid: true, message: "" }

    if (req.params.id === undefined) {
        result.code = 400;
        result.isValid = false;
        result.message = "'id' param is required";
        return result;
    }
    if (req.params.id.trim() === "") {
        result.code = 400;
        result.isValid = false;
        result.message = "'id' cannot be empty";
        return result;
    }
    if (isNaN(Number(req.params.id))) {
        result.code = 400;
        result.isValid = false;
        result.message = "'id' should be a number";
        return result;
    }
    if (req.body.rating === undefined) {
        result.code = 400;
        result.isValid = false;
        result.message = "'rating' field is required";
        return result;
    }
    if (req.body.rating === "") {
        result.code = 400;
        result.isValid = false;
        result.message = "'rating' cannot be empty";
        return result;
    }
    if (typeof req.body.rating !== "number") {
        result.code = 400;
        result.isValid = false;
        result.message = "'rating' should be in integer type";
        return result;
    }
    if (req.body.rating < 1 || req.body.rating > 5) {
        result.code = 400;
        result.isValid = false;
        result.message = "'rating' should between 1 to 5";
        return result;
    }
    // validate if the beer ID accurate
    const data = await commonCtrl.GetDataFromPunkAPI("getByID", req.params.id);
    if (data.length == 0) {
        result.code = 400;
        result.isValid = false;
        result.message = "no beer record found for the given ID";
        return result;
    }

    return result;
}

const rateBeer = async (req, res) => {
    try {

        // validate the request queryparams and params
        const reqstat = await isRateRequestValid(req);
        if (!reqstat.isValid) {
            return res.status(reqstat.code).json({
                status: reqstat.code,
                result: reqstat.message
            });
        }

        // implementing the body struct to be saved
        const body = {
            id: parseInt(req.params.id),
            rating: req.body.rating,
            comments: req.body.comments === undefined ? "" : req.body.comments
        }

        // load and insert new record to the local DB
        const db = NOSQL.load(RATINGS_DB);
        db.insert(body);

        res.json(body);
    } catch (error) {
        console.error('Internal Error: ', error);
        res.sendStatus(500);
    }
};

module.exports = {
    searchBeerByName,
    rateBeer
};