"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogOut = exports.ResturantLogIn = exports.ResturantSignUp = exports.CustomerLogIn = exports.CustomerSignUp = void 0;
const customer_validation_1 = require("../validation/customer.validation");
const exception_1 = require("../exception/exception");
const http_status_constants_1 = require("../constants/http-status.constants");
const auth_service_1 = require("../services/auth.service");
const response_utils_1 = require("../utils/response.utils");
const resturant_validation_1 = require("../validation/resturant.validation");
const cookie_utils_1 = require("../utils/cookie.utils");
const authService = new auth_service_1.AuthService();
const CustomerSignUp = async (req, res, next) => {
    try {
        const { error } = customer_validation_1.customerSignUpSchema.validate(req.body);
        if (error) {
            throw new exception_1.APIError(error.message, http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, {
                type: error.details[0].type,
                context: error.details[0].context
            });
        }
        req.body.address.phone_number1 = parseInt(req.body.address.phone_number1);
        const userBody = req.body;
        const response = await authService.customerSignUpService(userBody);
        (0, cookie_utils_1.setCookie)(res, "access_token", response.access_token);
        (0, cookie_utils_1.setCookie)(res, "refresh_token", response.refresh_token);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "User registered", response);
    }
    catch (err) {
        next(err);
    }
};
exports.CustomerSignUp = CustomerSignUp;
const CustomerLogIn = async (req, res, next) => {
    try {
        const { error } = customer_validation_1.customerLogInSchem.validate(req.body);
        if (error) {
            throw new exception_1.APIError(error.message, http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, {
                type: error.details[0].type,
                context: error.details[0].context
            });
        }
        const response = await authService.customerLogInService(req.body);
        (0, cookie_utils_1.setCookie)(res, "access_token", response.access_token);
        (0, cookie_utils_1.setCookie)(res, "refresh_token", response.refresh_token);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "User loggedIn", response);
    }
    catch (err) {
        next(err);
    }
};
exports.CustomerLogIn = CustomerLogIn;
const ResturantSignUp = async (req, res, next) => {
    try {
        console.log(req.cookies?.access_token);
        const { error } = resturant_validation_1.ResturantSignUpSchema.validate(req.body);
        if (error) {
            throw new exception_1.APIError(error.message, http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, {
                type: error.details[0].type,
                context: error.details[0].context
            });
        }
        const response = await authService.ResturantSignUpService(req.body);
        (0, cookie_utils_1.setCookie)(res, "access_token", response.access_token);
        (0, cookie_utils_1.setCookie)(res, "refresh_token", response.refresh_token);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "Resturant created", response);
    }
    catch (err) {
        next(err);
    }
};
exports.ResturantSignUp = ResturantSignUp;
const ResturantLogIn = async (req, res, next) => {
    try {
        const { error } = resturant_validation_1.ResturantLogInSchema.validate(req.body);
        if (error) {
            throw new exception_1.APIError(error.message, http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, {
                type: error.details[0].type,
                context: error.details[0].context
            });
        }
        const response = await authService.ResturantLogInService(req.body);
        (0, cookie_utils_1.setCookie)(res, "access_token", response.access_token);
        (0, cookie_utils_1.setCookie)(res, "refresh_token", response.refresh_token);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "you are loggedIn", response);
    }
    catch (err) {
        next(err);
    }
};
exports.ResturantLogIn = ResturantLogIn;
const LogOut = (req, res, next) => {
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "you are logged out");
};
exports.LogOut = LogOut;
