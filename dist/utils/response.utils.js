"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendAPIResponse = exports.SendErrorResponse = void 0;
const SendErrorResponse = (res, name, message, statusCode, details = null) => {
    return res.status(statusCode).json({
        success: false,
        statusCode: statusCode,
        name: name,
        message: message,
        details: details
    });
};
exports.SendErrorResponse = SendErrorResponse;
const SendAPIResponse = (res, statusCode, message, data = null) => {
    return res.status(statusCode).json({
        success: true,
        statusCode: statusCode,
        message: message,
        data: data
    });
};
exports.SendAPIResponse = SendAPIResponse;
