"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvProperty = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const exception_1 = require("../exception/exception");
const http_status_constants_1 = require("../constants/http-status.constants");
dotenv_1.default.config();
const getEnvProperty = (key) => {
    if (Object.keys(process.env).includes(key)) {
        const value = process.env[key];
        if (value != undefined && value != "") {
            return value;
        }
    }
    throw new exception_1.APIError(`Environment Variable ${key} not found.`, http_status_constants_1.HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE);
};
exports.getEnvProperty = getEnvProperty;
