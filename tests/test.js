var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000/CashierService/v1");

// UNIT test begin

var profile = {
    key: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxYTk5OWU2OTYyZGFmZjgxYzg1NWQ3MTRkYzEyYTdkOTMzYjI5MWQifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6IjVSalNDU2hORndDSHJVVi1UUTZDZXciLCJhdWQiOiI4MTAzOTk3MzAyMjMtOTIyZjFhaGI2MjgxY2U3MmZ2cm03dTZvdTZnNTJiYjAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDgwOTUxNDUzOTY2MjM0NzIyNDkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiODEwMzk5NzMwMjIzLTkyMmYxYWhiNjI4MWNlNzJmdnJtN3U2b3U2ZzUyYmIwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJyb2Jpbi5lZGJvbUBnbWFpbC5jb20iLCJpYXQiOjE0NTg2NDgxODEsImV4cCI6MTQ1ODY1MTc4MSwibmFtZSI6IlJvYmluIEVkYm9tIiwiZ2l2ZW5fbmFtZSI6IlJvYmluIiwiZmFtaWx5X25hbWUiOiJFZGJvbSIsImxvY2FsZSI6InN2In0.R2dB8OKqMfvZcL2sDr2YX0Bg1e-a0NlgneguR_He9MDwK0FRcdXNNCQLlOTvX9lI0Lz5dYxHtYH5aRF13czLbh18y_nRPSkK-r0OmFIlkFr8rvFNxNPTRb08WU4CJGWx40vlkunTdsuVSdjxWmpXUuYkDb9CloruSWR1IwZjgQcTKcBQvmbNVyr4FABUKTO1hQj4esyF82x6KQ_fvkYchYPX91saQyG4-Bcu9UO20YF6Qpr6o5LRtXf0Shk6Nza6_t2Iwxxq2fRYxnIwg-3Bp4aMFlWbR__B8XGsJJ8MrsO5RQZ_V3QbtKz0wFvpU1tJfqWo9ouU7FBbAfuUN8x7Vg'
};

var subjectKey = "108095145396623472249";


describe("SAMPLE unit test", function () {

    // #1 should return home page

    it("should return a user AKA Cashier", function ( done ) {

        server
            .post("/Cashier")
            .send(profile)
            .expect(200) // This is HTTP response
            .end(function ( err, res ) {

                // HTTP status should be 200
                res.status.should.equal(200);
                // The api should say success also
                res.body.success.should.equal(true);
                // There should be a subject key (sub) equal to our matching key
                res.body.data.id.should.equal(subjectKey);
                should.exists(res.body.data.name);
                should.exists(res.body.data.email);
                done();
            });
    });

    it("should return cashier already logged in", function ( done ) {

        server
            .post("/Cashier")
            .send(profile)
            .expect(401) // This is HTTP response
            .end(function ( err, res ) {
                // HTTP status should be 200
                res.status.should.equal(401);
                // Error key should be false.
                res.body.success.should.equal(false);
                should.not.exists(res.body.data.name);
                should.not.exists(res.body.data.email);
                done();
            });
    });

});