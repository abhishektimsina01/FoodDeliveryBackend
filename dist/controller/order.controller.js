"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.getOrder = exports.deleteOrders = exports.createOrder = void 0;
const order_validation_1 = require("../validation/order.validation");
const exception_1 = require("../exception/exception");
const order_service_1 = require("../services/order.service");
const response_utils_1 = require("../utils/response.utils");
const http_status_constants_1 = require("../constants/http-status.constants");
const orderService = new order_service_1.OrderService();
const createOrder = async (req, res, next) => {
    try {
        const { error } = order_validation_1.createOrderSchema.validate(req.body);
        if (error) {
            throw new exception_1.ValidationError(error);
        }
        const response = await orderService.createOrder(req.user, req.body);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "order made", response);
    }
    catch (err) {
        next(err);
    }
};
exports.createOrder = createOrder;
const deleteOrders = async (req, res, next) => {
    try {
        const response = await orderService.deleteOrders();
        console.log(response);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "deleted", response);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteOrders = deleteOrders;
const getOrder = async (req, res, next) => {
    try {
        // just fetch the order
    }
    catch (err) {
        next(err);
    }
};
exports.getOrder = getOrder;
const getOrders = async (req, res, next) => {
    try {
        const orders = (await orderService.getOrders(req.user));
        return (0, response_utils_1.SendAPIResponse)(res, 200, "orders fetched", orders);
    }
    catch (err) {
        next(err);
    }
};
exports.getOrders = getOrders;
