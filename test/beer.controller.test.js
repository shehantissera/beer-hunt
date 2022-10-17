'use strict'

import { expect } from 'chai';
import beerController from '../controllers/beer.controller.js';

describe('Beer Controller Tests', () => {

    describe('getSearchString() Test', () => {
        it('should trim the string', () => {
            expect(beerController.getSearchString(" word ")).to.equal("word");
        });
        it('should convert string to lowercase', () => {
            expect(beerController.getSearchString("WorD")).to.equal("word");
        });
        it('should replace all spaces with underscores', () => {
            expect(beerController.getSearchString("Big brown Fox")).to.equal("big_brown_fox");
        });
    });

    describe('isSearchRequestValid() Test', () => {
        it('should validate the q param to be required', () => {
            const req = {};
            req.query = {};
            const resp = beerController.isSearchRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should validate the q param to be not empty', () => {
            const req = {};
            req.query = {};
            req.query.q = "";
            const resp = beerController.isSearchRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
    });

    describe('isRateRequestValid() Test', () => {
        it('should validate the id param to be required', async () => {
            const req = {};
            req.params = {};
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should validate the id param to be not empty', async () => {
            const req = {};
            req.params = {};
            req.params.id = "";
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if a string is passed', async () => {
            const req = {};
            req.params = {};
            req.params.id = "number";
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if a string contains special characters', async () => {
            const req = {};
            req.params = {};
            req.params.id = "someone@somewhere.com";
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if request body missing', async () => {
            const req = {};
            req.params = {};
            req.params.id = "4";
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if rating feild is missing', async () => {
            const req = {};
            req.params = {};
            req.params.id = "4";
            req.body = {};
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if rating feild is empty string', async () => {
            const req = {};
            req.params = {};
            req.params.id = "4";
            req.body = {};
            req.body.rating = "";
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if rating feild is a string', async () => {
            const req = {};
            req.params = {};
            req.params.id = "4";
            req.body = {};
            req.body.rating = "six";
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if rating is below 1', async () => {
            const req = {};
            req.params = {};
            req.params.id = "4";
            req.body = {};
            req.body.rating = -2;
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if rating is above 5', async () => {
            const req = {};
            req.params = {};
            req.params.id = "4";
            req.body = {};
            req.body.rating = 7;
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if ID is an invalid beer ID', async () => {
            const req = {};
            req.params = {};
            req.params.id = "1000000";
            req.body = {};
            req.body.rating = 7;
            const resp = await beerController.isRateRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
    });

    describe('isGetRatingRequestValid() Test', () => {
        it('should validate the id param to be required', async () => {
            const req = {};
            req.params = {};
            const resp = await beerController.isGetRatingRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should validate the id param to be not empty', async () => {
            const req = {};
            req.params = {};
            req.params.id = "";
            const resp = await beerController.isGetRatingRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if a string is passed', async () => {
            const req = {};
            req.params = {};
            req.params.id = "number";
            const resp = await beerController.isGetRatingRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if a string contains special characters', async () => {
            const req = {};
            req.params = {};
            req.params.id = "someone@somewhere.com";
            const resp = await beerController.isGetRatingRequestValid(req);
            expect(resp.isValid).to.equal(false);
        });
    });
});