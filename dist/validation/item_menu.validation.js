"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMenuSchema = exports.createMenuSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const enums_1 = require("../enums/enums");
exports.createMenuSchema = joi_1.default.object({
    item_name: joi_1.default.string()
        .trim()
        .min(2)
        .max(100)
        .required(),
    item_type: joi_1.default.string()
        .valid(...Object.values(enums_1.ITEM_TYPE))
        .required(),
    price: joi_1.default.number()
        .positive()
        .required()
});
exports.updateMenuSchema = joi_1.default.object({
    item_name: joi_1.default.string()
        .trim()
        .min(2)
        .max(100),
    item_type: joi_1.default.string()
        .valid(...Object.values(enums_1.ITEM_TYPE)),
    price: joi_1.default.number()
        .positive()
})
    .min(1);
