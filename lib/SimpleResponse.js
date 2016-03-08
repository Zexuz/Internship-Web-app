"use strict";

class SimpleResponse {

    static sendSimpleResponse( req, res, success, data, statusCode ) {

        statusCode = statusCode || 200;

        var response = {
            success: success,
            data: data
        };

        return res.status(statusCode).json(response);
    }

}

module.exports = SimpleResponse;