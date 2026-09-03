"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverRoute = void 0;
const express_1 = __importDefault(require("express"));
const error_handler_middleware_1 = require("../middleware/error.handler.middleware");
const auth_routes_1 = require("./auth.routes");
const user_route_1 = require("./user.route");
const delivery_route_1 = require("./delivery.route");
const menu_route_1 = require("./menu.route");
const order_route_1 = require("./order.route");
const resturant_route_1 = require("./resturant.route");
const trasnsaction_route_1 = require("./trasnsaction.route");
const webhook_routes_1 = require("./webhook.routes");
const serverRoute = (app) => {
    app.get("/", (req, res) => {
        res.json({
            message: "hello welcome to food delivery"
        });
    });
    app.use("/api/v1/webhook", webhook_routes_1.webhookRouter);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/api/v1", [
        auth_routes_1.authRouter,
        user_route_1.userRouter,
        delivery_route_1.deliveryRouter,
        menu_route_1.menuRouter,
        order_route_1.orderRouter,
        resturant_route_1.resturantRouter,
        trasnsaction_route_1.transactionRouter
    ]);
    // error handler middleware
    app.use(error_handler_middleware_1.notFound);
    app.use(error_handler_middleware_1.errorHandler);
    console.log("Server routes registered✅");
};
exports.serverRoute = serverRoute;
