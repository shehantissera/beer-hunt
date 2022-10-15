'use strict'

// using this package because it makes our life easier
const fetch = require('node-fetch');

// get the base URL from the config
const config = require('config');
const PUNK_API_BASE = config.get('PUNK_API_BASE');

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

// this method invokes the API for data
const GetDataFromPunkAPI = async (type, params) => {
    const records = [];

    // need to handle pagination, 1 req per second

    // select functionality based on the function type
    switch (type) {
        case "search": {

            let paginate = true;
            let page = 1;
            const perPage = 50;

            // since the API could reply with more than the default 25 records, we need to handle it.
            do {
                const url = `${PUNK_API_BASE}/beers?beer_name=${params}&page=${page}&per_page=${perPage}`
                const response = await fetch(url);
                const data = await response.json();

                // loop over the data retrived, collect it to our record list
                if (data.length > 0) {
                    data.forEach(e => {
                        // create a beer object with the required fields
                        records.push(new Beer(e.id, e.name, e.description, e.first_brewed, e.food_pairing));
                    });
                }

                // determine to continue pagination or not based on the number of records returned.
                if (data.length < perPage) {
                    paginate = false;
                } else {
                    page++;
                }
            } while (paginate);
            break;
        }
        case "getByID": {

            const url = `${PUNK_API_BASE}/beers/${params}`
            const response = await fetch(url);
            const data = await response.json();

            // loop over the data retrived, collect it to our record list
            if (data.length > 0) {
                data.forEach(e => {
                    // create a beer object with the required fields
                    records.push(new Beer(e.id, e.name, e.description, e.first_brewed, e.food_pairing));
                });
            }


            break;
        }
    }

    console.info("Records retrived: ", records.length);
    return records;
}

module.exports = { GetDataFromPunkAPI }