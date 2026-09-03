"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = void 0;
const setCookie = (res, key, value) => {
    res.cookie(key, value, {
        maxAge: (key == "access_token") ? 1000 * 60 * 60 * 24 : 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
        sameSite: "strict",
        secure: true
    });
};
exports.setCookie = setCookie;
