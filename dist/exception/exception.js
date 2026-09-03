"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = exports.ValidationError = exports.APIError = exports.DatabaseException = void 0;
const http_status_constants_1 = require("../constants/http-status.constants");
class DatabaseException extends Error {
    statusCode;
    name;
    details;
    constructor(message, statusCode, details = null) {
        super(message);
        this.name = "DatabaseException";
        this.statusCode = statusCode;
        this.details = details;
    }
}
exports.DatabaseException = DatabaseException;
class APIError extends Error {
    statusCode;
    details;
    constructor(message, statusCode, details = null) {
        super(message);
        this.name = "APIError";
        this.statusCode = statusCode;
        this.details = details;
    }
}
exports.APIError = APIError;
class ValidationError extends APIError {
    constructor(error) {
        super(error.message, http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, {
            type: error.details[0].type,
            context: error.details[0].context
        });
        this.name = "VALIDATION_ERROR";
    }
}
exports.ValidationError = ValidationError;
class AuthenticationError extends APIError {
    constructor(name, message) {
        super(message, http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.UNAUTHORIZED.CODE);
        this.name = name;
    }
}
exports.AuthenticationError = AuthenticationError;
