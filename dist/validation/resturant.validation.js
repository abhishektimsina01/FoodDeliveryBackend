"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResturantLogInSchema = exports.ResturantSignUpSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const customer_validation_1 = require("./customer.validation");
exports.ResturantSignUpSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    resturant_name: joi_1.default.string().min(2).max(40).required(),
    owner_name: joi_1.default.string().min(2).max(40).required(),
    password: joi_1.default.string().min(8).max(16).required(),
    address: customer_validation_1.addressSchema
});
exports.ResturantLogInSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(8).max(16).required()
});
