"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
const exception_1 = require("../exception/exception");
const http_status_constants_1 = require("../constants/http-status.constants");
const response_utils_1 = require("../utils/response.utils");
// not found api
const notFound = (req, res, next) => {
    // pass it to the errorHanlder after making the error
    const err = new exception_1.APIError(`page not found`, http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE, {
        url: req.originalUrl,
        method: req.method
    });
    next(err);
};
exports.notFound = notFound;
// error passed to it
const errorHandler = (err, req, res, next) => {
    // respond the error to the frontend
    if (err instanceof Error || exception_1.APIError) {
        (0, response_utils_1.SendErrorResponse)(res, err.name, err.message, err.statusCode, err.details);
    }
};
exports.errorHandler = errorHandler;
