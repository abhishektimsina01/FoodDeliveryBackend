"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerLogInSchem = exports.customerSignUpSchema = exports.addressSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.addressSchema = joi_1.default.object({
    street_name: joi_1.default.string().required(),
    city: joi_1.default.string().required(),
    ward_num: joi_1.default.number().positive().required(),
    phone_number1: joi_1.default.string()
        .pattern(/^[0-9]{10}$/)
        .messages({ 'string.pattern.base': 'Phone number must be exactly 10 digits.' })
        .required(),
});
exports.customerSignUpSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().min(8).max(16).required(),
    email: joi_1.default.string().email().required(),
    address: exports.addressSchema.optional(),
});
exports.customerLogInSchem = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(8).max(16)
});
