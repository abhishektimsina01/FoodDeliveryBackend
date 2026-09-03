"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorization = exports.authenticationMiddleware = void 0;
const exception_1 = require("../exception/exception");
const jwt_utils_1 = require("../utils/jwt.utils");
const customer_repo_1 = require("../repositories/customer.repo");
const enums_1 = require("../enums/enums");
const resturant_repos_1 = require("../repositories/resturant.repos");
const authenticationMiddleware = async (req, res, next) => {
    try {
        const customerRepo = new customer_repo_1.CustomerRepository();
        const restroRepo = new resturant_repos_1.ResturantRepository();
        const access_token = req.cookies?.access_token;
        if (!access_token) {
            throw new exception_1.AuthenticationError("TOKEN_NOT_FOUND", "token not found");
        }
        const payload = (0, jwt_utils_1.verifyToken)(access_token);
        let IsUser = false;
        if (payload.role == enums_1.Role.CUSTOMER) {
            IsUser = await customerRepo.checkCustomer("customer_id", payload.id);
        }
        else if (payload.role == enums_1.Role.RESTURANT) {
            IsUser = await restroRepo.checkResturant(payload.id);
        }
        if (!IsUser) {
            throw new exception_1.AuthenticationError("USER_NOT_FOUND", "seems like the users doesnot exist");
        }
        const { iat, exp, ...userData } = payload;
        req.user = userData;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.authenticationMiddleware = authenticationMiddleware;
const authorization = (...AllowedRole) => {
    return (req, res, next) => {
        const { role } = req.user;
        if (AllowedRole.includes(role)) {
            console.log("you are allowed");
            next();
        }
        else {
            const err = new exception_1.AuthenticationError("USER_NOT_ALLOWED", `${role} is not allowed`);
            next(err);
        }
    };
};
exports.authorization = authorization;
