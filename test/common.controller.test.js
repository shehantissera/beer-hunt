'use strict'

import { expect } from 'chai';
import commonController from '../controllers/common.controller.js';

describe('Common Controller Tests', () => {

    describe('validateEmail() Test', () => {
        it('should fail if just a string is passed', () => {
            expect(commonController.validateEmail("word")).to.equal(null);
        });
        it('should fail if an incomplete email is given', () => {
            expect(commonController.validateEmail("admin@somewhere")).to.equal(null);
        });
        it('should pass if an complete email is given', () => {
            expect(commonController.validateEmail("admin@somewhere.com")).to.not.equal(null);
        });
    });

    describe('ValidateIncomingRequests() Test', () => {
        it('should fail if x-user header is not present', () => {
            const req = {};
            req.headers = {};
            const resp = commonController.ValidateIncomingRequests(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if x-user is an empty string', () => {
            const req = {};
            req.headers = {};
            req.headers["x-user"] = "";
            const resp = commonController.ValidateIncomingRequests(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should fail if x-user is not an email', () => {
            const req = {};
            req.headers = {};
            req.headers["x-user"] = "shakaboom";
            const resp = commonController.ValidateIncomingRequests(req);
            expect(resp.isValid).to.equal(false);
        });
        it('should pass if x-user is an email', () => {
            const req = {};
            req.headers = {};
            req.headers["x-user"] = "system@admin.com";
            const resp = commonController.ValidateIncomingRequests(req);
            expect(resp.isValid).to.equal(true);
        });
    });

    describe('LogRequest() Test', () => {
        it('should return true if logging successfull', async () => {
            const req = {};
            req.headers = { 'x-user': "test@tests.com" };
            const resp = await commonController.LogRequest(req);
            expect(resp).to.equal(true);
        });
    });

    describe('GetDataFromPunkAPI() Test', () => {
        it('should return an empty array if type is not implemented', async () => {
            const params = "";
            const resp = await commonController.GetDataFromPunkAPI("none", params);
            expect(resp).to.eql([]);
        });
        it('should return an array with one item for the term "Doodlebug"', async () => {
            const params = "Doodlebug";
            const resp = await commonController.GetDataFromPunkAPI("search", params);
            expect(resp).to.have.lengthOf(1);
        });
        it('should return an array with one item for the ID 1', async () => {
            const params = "1";
            const resp = await commonController.GetDataFromPunkAPI("getByID", params);
            expect(resp).to.have.lengthOf(1);
        });
        it('should return an empty array if ID is not existing', async () => {
            const params = "10000000000";
            const resp = await commonController.GetDataFromPunkAPI("getByID", params);
            expect(resp).to.have.lengthOf(0);
        });
    });
});