"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const get_env_utils_1 = require("./get.env.utils");
const exception_1 = require("../exception/exception");
const generateToken = (userInfo, role) => {
    const access_token = jsonwebtoken_1.default.sign({ ...userInfo, role }, (0, get_env_utils_1.getEnvProperty)("access_token_secret_key"), {
        expiresIn: "1d"
    });
    const refresh_token = jsonwebtoken_1.default.sign({ id: userInfo.id, role }, (0, get_env_utils_1.getEnvProperty)("refresh_token_secret_key"), {
        expiresIn: "30d"
    });
    return { access_token, refresh_token };
};
exports.generateToken = generateToken;
const verifyToken = (access_token) => {
    try {
        const payload = jsonwebtoken_1.default.verify(access_token, (0, get_env_utils_1.getEnvProperty)("access_token_secret_key"));
        return payload;
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new exception_1.AuthenticationError("TOKEN_EXPIRED", "Token has expired, please refresh");
        }
        else if (err instanceof jsonwebtoken_1.default.NotBeforeError) {
            throw new exception_1.AuthenticationError("TOKEN_NOT_READY", "Token has expired");
        }
        else {
            throw new exception_1.AuthenticationError("TOKEN_INVALID", "Token has been tampered");
        }
    }
};
exports.verifyToken = verifyToken;
