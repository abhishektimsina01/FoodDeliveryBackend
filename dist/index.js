"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfiguration = void 0;
const express_1 = __importDefault(require("express"));
const get_env_utils_js_1 = require("./utils/get.env.utils.js");
const connect_js_1 = require("./database/connect.js");
const server_middleware_js_1 = require("./middleware/server.middleware.js");
const server_routes_js_1 = require("./routes/server.routes.js");
const appConfiguration = async () => {
    try {
        const app = (0, express_1.default)();
        await (0, connect_js_1.connectToDatabase)();
        (0, server_middleware_js_1.serverMiddleware)(app);
        (0, server_routes_js_1.serverRoute)(app);
        app.listen((0, get_env_utils_js_1.getEnvProperty)("port"), (err) => {
            if (err) {
                console.log(`${err.name}, ${err.message} occurred.`);
                console.log("server couldnot start❌");
            }
            else {
                console.log(`Server started successfully on port ${(0, get_env_utils_js_1.getEnvProperty)("port")}.✅`);
            }
        });
        return app;
    }
    catch (err) {
        console.log(err);
    }
};
exports.appConfiguration = appConfiguration;
