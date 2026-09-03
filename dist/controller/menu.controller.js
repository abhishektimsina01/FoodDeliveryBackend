"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getItem = exports.getItems = exports.createItem = void 0;
const item_menu_validation_1 = require("../validation/item_menu.validation");
const menu_service_1 = require("../services/menu.service");
const response_utils_1 = require("../utils/response.utils");
const http_status_constants_1 = require("../constants/http-status.constants");
const exception_1 = require("../exception/exception");
const menuService = new menu_service_1.MenuService();
const createItem = async (req, res, next) => {
    try {
        const { error } = item_menu_validation_1.createMenuSchema.validate(req.body);
        if (error) {
            throw new exception_1.ValidationError(error);
        }
        const response = await menuService.createItem(req.user, req.body);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "item added", response);
    }
    catch (err) {
        next(err);
    }
};
exports.createItem = createItem;
const getItems = async (req, res, next) => {
    try {
        const response = await menuService.getItems(req.user);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "menu fetched", response);
    }
    catch (err) {
        next(err);
    }
};
exports.getItems = getItems;
const getItem = async (req, res, next) => {
    try {
        const response = await menuService.getItem(req.user, +req.params.id);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "Item is fetched", response);
    }
    catch (err) {
        next(err);
    }
};
exports.getItem = getItem;
