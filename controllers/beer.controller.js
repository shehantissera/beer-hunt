'use strict'

const searchBeerByName = async (req, res) => {
    try {
        res.json({});
    } catch (error) {
        console.log('Internal Error: ', error);
        res.sendStatus(500);
    }
};

const rateBeer = async (req, res) => {
    try {
        res.json({});
    } catch (error) {
        console.log('Internal Error: ', error);
        res.sendStatus(500);
    }
};

module.exports = {
    searchBeerByName,
    rateBeer
};