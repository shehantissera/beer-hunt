'use strict'

import chai from 'chai';
import chaiHttp from 'chai-http'
import express from 'express'
import beerRouter from '../routes/beer.route.js'

const expect = chai.expect;

chai.use(chaiHttp)

const createFakeServer = () => {
    const app = express()
    const apiPort = 30501;

    app.use('/api/beer', beerRouter);

    app.listen(apiPort);
    return app;
}

describe('API Tests', () => {

    describe('GET /api/beer/', () => {
        let fakeServer;

        before(() => {
            fakeServer = createFakeServer()
        })

        it('should return array with one object', (done) => {
            chai.request(fakeServer)
                .get("/api/beer/search?q=Doodlebug")
                .set('x-user', 'test@user.com')
                .end((err, res) => {

                    expect(err).to.be.null
                    expect(res).to.have.status(200)

                    expect(res.body).to.be.a('array')
                    expect(res.body).to.have.lengthOf(1)

                    done()
                })
        })

        it('should return an empty array for absurd searches', (done) => {
            chai.request(fakeServer)
                .get("/api/beer/search?q=Out of the world beer")
                .set('x-user', 'test@user.com')
                .end((err, res) => {

                    expect(err).to.be.null
                    expect(res).to.have.status(200)

                    expect(res.body).to.be.a('array')
                    expect(res.body).to.have.lengthOf(0)

                    done()
                })
        })

        it('should return an empty array for none existing beer ID', (done) => {
            chai.request(fakeServer)
                .post("/api/beer/rate/1234567")
                .set('x-user', 'test@user.com')
                .set('content-type', 'application/json')
                .send({
                    rating: 1,
                    comments: ""
                })
                .end((err, res) => {

                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('status')
                    expect(res.body.status).to.equal(400)

                    done()
                })

        })

        it('should return an response object for rating a correct beer ID', (done) => {
            chai.request(fakeServer)
                .post("/api/beer/rate/1")
                .set('x-user', 'test@user.com')
                .set('content-type', 'application/json')
                .send({
                    rating: 5,
                    comments: "test comment"
                })
                .then((err, res) => {
                    expect(res.body).to.be.a('object')
                    expect(res.body).to.have.property('status')
                    expect(res.body.status).to.equal(200)
                })
                .catch(done())

        })
    })
})