'use strict'

const config = require('config');

// using this package because it makes our life easier
const fetch = require('node-fetch');

// get the base URL from the config
const PUNK_API_BASE = config.get('PUNK_API_BASE');

// testcases
// validate input parameter
// validate if the return search query contains understors instead of spaces- test with different inputs
// does the pagination work 1 req per second
// check getDataFromPunkAPI with the result length based on a search param

// defining a class to makesure the beer objects we make sticks to one template
class Beer {
    constructor(id, name, description, first_brewed, food_pairing) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.first_brewed = first_brewed;
        this.food_pairing = food_pairing;
    }
}

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

    if (req.query.q == undefined) {
        result.code = 400;
        result.isValid = false;
        result.message = "'q' queryparam is required"
    }
    if (req.query.q == "") {
        result.code = 400;
        result.isValid = false;
        result.message = "'q' cannot be empty"
    }

    return result;
}

// this method invokes the API for data
const getDataFromPunkAPI = async (searchString) => {
    let paginate = true;
    let page = 1;
    const perPage = 50;
    const records = [];

    // need to handle pagination, 1 req per second

    // since the API could reply with more than the default 25 records, we need to handle it.
    do {
        let url = `${PUNK_API_BASE}/beers?beer_name=${searchString}&page=${page}&per_page=${perPage}`;
        const response = await fetch(url);
        const data = await response.json();

        // loop over the data retrived, collect it to our record list
        data.forEach(e => {
            // create a beer object with the required fields
            records.push(new Beer(e.id, e.name, e.description, e.first_brewed, e.food_pairing));
        });

        // determine to continue pagination or not based on the number of records returned.
        if (data.length < perPage) {
            paginate = false;
        } else {
            page++;
        }
    } while (paginate);

    console.info("Records retrived: ", records.length);
    return records;
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
        const data = await getDataFromPunkAPI(searchString);



        res.json(data);
    } catch (error) {
        console.error('Internal Error: ', error);
        res.sendStatus(500);
    }
};



const rateBeer = async (req, res) => {
    try {
        res.json({});
    } catch (error) {
        console.error('Internal Error: ', error);
        res.sendStatus(500);
    }
};

module.exports = {
    searchBeerByName,
    rateBeer
};