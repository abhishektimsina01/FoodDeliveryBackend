"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRouter = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const webhooks_controller_1 = require("../controller/webhooks.controller");
exports.webhookRouter = (0, express_1.Router)();
exports.webhookRouter.post("/payment", express_2.default.raw({ type: "application/json" }), (req, res, next) => {
    console.log("hook ma event aayo hai");
    next();
}, webhooks_controller_1.payment);
exports.webhookRouter.get("/success", (req, res) => {
    res.json({
        "message": "payment done"
    });
});
exports.webhookRouter.get("/cancel", (req, res) => {
    res.json({
        "error": "payment canceled"
    });
});
