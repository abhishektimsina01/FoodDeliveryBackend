"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResturant = exports.updateResturantAdmin = exports.updateResturant = exports.getResturant = exports.getResturants = void 0;
const resturants_service_1 = require("../services/resturants.service");
const response_utils_1 = require("../utils/response.utils");
const http_status_constants_1 = require("../constants/http-status.constants");
const resturantService = new resturants_service_1.ResturantService();
const getResturants = async (req, res, next) => {
    try {
        const { id, username, role } = req.user;
        const filter = req.query;
        const response = await resturantService.getResturants({ id, username, role }, filter);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "Resturants fetched", response);
    }
    catch (err) {
        next(err);
    }
};
exports.getResturants = getResturants;
const getResturant = async (req, res, next) => {
    try {
        const { id, username, role } = req.user;
        const resturantId = req.params.id;
        const response = await resturantService.getResturant({ id, username, role }, resturantId);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "Resturant fetched", response);
    }
    catch (err) {
        next(err);
    }
};
exports.getResturant = getResturant;
const updateResturant = async (req, res, next) => {
    try {
        const { id, username, role } = req.user;
        const resturantData = req.body;
        const response = await resturantService.updateResturant({ id, username, role }, resturantData);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "Resturant updated", response);
    }
    catch (err) {
        next(err);
    }
};
exports.updateResturant = updateResturant;
const updateResturantAdmin = async (req, res, next) => {
    try {
        const response = await resturantService.updateResturantAdmin(req.user, req.body, req.params.id);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "resturant updated", response);
    }
    catch (err) {
        next(err);
    }
};
exports.updateResturantAdmin = updateResturantAdmin;
const deleteResturant = async (req, res, next) => {
    try {
        const resturantId = req.params.id;
        const resturant = await resturantService.deleteResturant(resturantId);
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "Resturant deleted", resturant);
    }
    catch (err) {
        next(err);
    }
};
exports.deleteResturant = deleteResturant;
