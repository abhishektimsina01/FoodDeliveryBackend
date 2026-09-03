"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripe = void 0;
const stripe_1 = __importDefault(require("stripe"));
const get_env_utils_1 = require("../utils/get.env.utils");
exports.stripe = new stripe_1.default((0, get_env_utils_1.getEnvProperty)("stripe_secret_key"));
