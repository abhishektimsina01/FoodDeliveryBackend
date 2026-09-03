"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const response_utils_1 = require("../utils/response.utils");
const http_status_constants_1 = require("../constants/http-status.constants");
const user_service_1 = require("../services/user.service");
const userService = new user_service_1.UserService();
const getProfile = async (req, res, next) => {
    try {
        const { id, username, role } = req.user;
        const response = await userService.getProfileService({ id, username, role });
        return (0, response_utils_1.SendAPIResponse)(res, http_status_constants_1.HTTP_STATUS.SUCCESS.OK.CODE, "Profile fetched", response);
    }
    catch (err) {
        next(err);
    }
};
exports.getProfile = getProfile;
