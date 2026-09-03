"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const hashPassword = async (originalPassword) => {
    const hashed_password = await bcryptjs_1.default.hash(originalPassword, 10);
    return hashed_password;
};
exports.hashPassword = hashPassword;
const checkPassword = async (originalPassword, hashPassword) => {
    const IsSame = await bcryptjs_1.default.compare(originalPassword, hashPassword);
    return IsSame;
};
exports.checkPassword = checkPassword;
