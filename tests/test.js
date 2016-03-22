var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

var profile = {
    key: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxYTk5OWU2OTYyZGFmZjgxYzg1NWQ3MTRkYzEyYTdkOTMzYjI5MWQifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6IkxsdjZ4Si0tbWdmeFlyamNOOXhicmciLCJhdWQiOiI4MTAzOTk3MzAyMjMtOTIyZjFhaGI2MjgxY2U3MmZ2cm03dTZvdTZnNTJiYjAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDgwOTUxNDUzOTY2MjM0NzIyNDkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiODEwMzk5NzMwMjIzLTkyMmYxYWhiNjI4MWNlNzJmdnJtN3U2b3U2ZzUyYmIwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJyb2Jpbi5lZGJvbUBnbWFpbC5jb20iLCJpYXQiOjE0NTg2NTYxNDAsImV4cCI6MTQ1ODY1OTc0MCwibmFtZSI6IlJvYmluIEVkYm9tIiwiZ2l2ZW5fbmFtZSI6IlJvYmluIiwiZmFtaWx5X25hbWUiOiJFZGJvbSIsImxvY2FsZSI6InN2In0.bBMAkcocVA9jPjvQp06Qd5se3h3c07h0PywjpLnNbgYyxjwuzSEL936jYywPa3WOBthQwnZrj6mT7P3sueAC9H7wMc0tP16t2p9JMA4fbeCilNuN5ElSHbLMOes9pNQMhN6IvYn08ylFk-2Ha5gn9Pq7FSKYweuxPSLPfOC7TN6_PbuuAZlqz8WptFQ8Eclb_1pSgUz5Lvjh0IlTziXkGt_s32W6Vph1R9TGCR_DsSWsOpcsRuOgzzuF82oDJvrA_9e_1UJO6LcitGLBdS5M_3vW6gpgwxq_VQShv2R-QS1qBPyozRLkrhv4fAcMPJzDCU4za-I3CRPwWwNGf6wyVA'
};

var subjectKey = "108095145396623472249";


describe("SAMPLE unit test", function () {

    describe("login", function () {
        var service = "/CashierService/v1/Cashier";

        it("should log us in and return a user AKA Cashier", function ( done ) {

            server
                .post(service)
                .send(profile)
                .expect(200) // This is HTTP response
                .end(function ( err, res ) {

                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // The api should say success also
                    res.body.success.should.equal(true);
                    // There should be a subject key (sub) equal to our matching key
                    done();
                });
        });

        it("should return cashier already logged in", function ( done ) {

            server
                .post(service)
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

    describe("Cart ", function () {
        var service = "/CashierService/v1/Cashier/Cart";


        it("should return my cart",  function ( done ) {

            server
                .get(service)
                .query({ key: subjectKey })
                .expect(200) // This is HTTP response
                .end(function ( err, res ) {

                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // The api should say success also
                    res.body.success.should.equal(true);
                    // No items in the cart
                    res.body.data.items.length.should.equal(0);
                    done();
                });
        });

        it("should add a item to my cart",  function ( done ) {

            server
                .post(service)
                .query({ key: subjectKey })
                .send({ sku: 4358217 })
                .expect(200) // This is HTTP response
                .end(function ( err, res ) {

                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // The api should say success also
                    res.body.success.should.equal(true);
                    res.body.data.items.length.should.equal(1);
                    // There should be a subject key (sub) equal to our matching key
                    done();
                });
        });

        it("should increase the quantity of a item to my cart",  function ( done ) {

            server
                .post(service )
                .query({ key: subjectKey })
                .send({ sku: 4358217 })
                .expect(200) // This is HTTP response
                .end(function ( err, res ) {

                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // The api should say success also
                    res.body.success.should.equal(true);
                    res.body.data.items.length.should.equal(1);
                    res.body.data.items[ 0 ].quant.should.equal(2);
                    // There should be a subject key (sub) equal to our matching key
                    done();
                });
        });

        it("should return item not found",  function ( done ) {

            server
                .post(service)
                .query({ key: subjectKey })
                .send({ sku: 1 })
                .expect(404) // This is HTTP response
                .end(function ( err, res ) {

                    // HTTP status should be 200
                    res.status.should.equal(404);
                    // The api should say success also
                    res.body.success.should.equal(false);
                    done();
                });
        });

        it("should decrease quantity of a item in my cart",  function ( done ) {

            server
                .delete(service + '/4358217')
                .query({ key: subjectKey})
                .expect(200) // This is HTTP response
                .end(function ( err, res ) {

                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // The api should say success also
                    res.body.success.should.equal(true);
                    res.body.data.items.length.should.equal(1);
                    res.body.data.items[ 0 ].quant.should.equal(1);
                    done();
                });
        });

        it("should delete a item in my cart",  function ( done ) {

            server
                .delete(service)
                .query({ key: subjectKey, sku: 4358217 })
                .expect(200) // This is HTTP response
                .end(function ( err, res ) {

                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // The api should say success also
                    res.body.success.should.equal(true);
                    res.body.data.items.length.should.equal(0);
                    done();
                });
        });

        it("should respond with 'item not found'",  function ( done ) {
            server
                .delete(service + "/1")
                .query({ key: subjectKey})
                .expect(404) // This is HTTP response
                .end(function ( err, res ) {
                    // HTTP status should be 200
                    res.status.should.equal(404);
                    // The api should say success also
                    res.body.success.should.equal(false);
                    done();
                });
        });


    });

    describe('logout', function () {
        var service = "/CashierService/v1/Cashier";


        it("should log the cashier out",  function ( done ) {
            server
                .delete(service)
                .query({ key: subjectKey })
                .expect(200) // This is HTTP response
                .end(function ( err, res ) {
                    // HTTP status should be 200
                    res.status.should.equal(200);

                    res.body.success.should.equal(true);
                    res.body.data.should.equal(true);
                    done();
                });
        });

        it("should return cashier not found AKA alredy logged out",  function ( done ) {
            //This testes that we can't logout a user that is not logged in.
            server
                .delete(service)
                .query({ key: subjectKey })
                .expect(403) // This is HTTP response
                .end(function ( err, res ) {
                    res.status.should.equal(403);
                    res.body.success.should.equal(false);
                    done();
                });
        })
    });

});