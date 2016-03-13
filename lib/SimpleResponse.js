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

    static sendError(req,res,data,statusCode){
        SimpleResponse.sendSimpleResponse(req,res,false,data,statusCode);
    }

    static sendSuccess(req,res,data,statusCode){
        SimpleResponse.sendSimpleResponse(req,res,true,data,statusCode);
    }

}

module.exports = SimpleResponse;