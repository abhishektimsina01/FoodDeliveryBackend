"use strict";
// we register all the server-middleware in our application
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverMiddleware = void 0;
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const rate_limiter_1 = require("../config/rate.limiter");
const serverMiddleware = (app) => {
    app.use((0, cookie_parser_1.default)());
    app.use((0, morgan_1.default)("dev"));
    app.use(rate_limiter_1.limiter);
    console.log("Server middleware registered✅");
};
exports.serverMiddleware = serverMiddleware;
