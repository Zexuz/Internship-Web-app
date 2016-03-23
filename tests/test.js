var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:3000");

// UNIT test begin

var profile = {
    key: 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImMxYTk5OWU2OTYyZGFmZjgxYzg1NWQ3MTRkYzEyYTdkOTMzYjI5MWQifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXRfaGFzaCI6Ims3OGtWNHlYM29xUm5ZTnRWWVdRTGciLCJhdWQiOiI4MTAzOTk3MzAyMjMtOTIyZjFhaGI2MjgxY2U3MmZ2cm03dTZvdTZnNTJiYjAuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDgwOTUxNDUzOTY2MjM0NzIyNDkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiODEwMzk5NzMwMjIzLTkyMmYxYWhiNjI4MWNlNzJmdnJtN3U2b3U2ZzUyYmIwLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiZW1haWwiOiJyb2Jpbi5lZGJvbUBnbWFpbC5jb20iLCJpYXQiOjE0NTg2NjEyMDAsImV4cCI6MTQ1ODY2NDgwMCwibmFtZSI6IlJvYmluIEVkYm9tIiwiZ2l2ZW5fbmFtZSI6IlJvYmluIiwiZmFtaWx5X25hbWUiOiJFZGJvbSIsImxvY2FsZSI6InN2In0.apsDDSrx4y2GjII2t4I-ZoBCrTG4N6FJSpir_qhm2uBbgo7GYygKjbCT_fm9raQNIdTXLvdZcFmqVHwcZayNM7iYCUUBETq0Yfx7ZYuaYiQVOx9C2odqCwC6hmBpgrYjh5DYcemM5JhqG_wZ90JtMAP3yZY2dZtFaA0YfNl_zYefNnqCWS0MYeyLf25cIw7E93hWyRfu1JATPCNoKyiV4fiknSprWPCsMjU9T1cDJGPVybHfk5pldDtuOaI4vn1kY-uaun2UIWfyDSFEMOQ0SUP1imkLzbil-d3L4gPNkeyWgZVH4N87e5VMr8uuR3TAG0_8fy1MAzMhTLQGMi206g'
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

        //todo test for paying
        //todo test for looking at z-report


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