"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.createOrderSchema = joi_1.default.object({
    resturant_id: joi_1.default.number()
        .integer()
        .positive()
        .required(),
    items: joi_1.default.array().items(joi_1.default.object({
        item_id: joi_1.default.number().min(1).positive().required(),
        quantity: joi_1.default.number().min(1).required()
    })).min(1).required(),
    deadline: joi_1.default.date()
        .iso()
        .greater("now")
        .optional()
        .allow(null)
});
