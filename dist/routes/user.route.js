"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const customer_repo_1 = require("../repositories/customer.repo");
const address_repos_1 = require("../repositories/address.repos");
const resturant_repos_1 = require("../repositories/resturant.repos");
const auth_middleware_1 = require("../middleware/auth.middleware");
const user_controller_1 = require("../controller/user.controller");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.delete("/deleteAllUsers", async (req, res, next) => {
    try {
        const custoRepo = new customer_repo_1.CustomerRepository();
        const restroRepo = new resturant_repos_1.ResturantRepository();
        const resturants = await restroRepo.deleteResturants();
        const users = await custoRepo.deleteCustomer();
        const addresses = await (0, address_repos_1.deleteAdress)();
        res.clearCookie("access_token").clearCookie("refresh_token");
        res.json({ users, resturants, addresses });
    }
    catch (err) {
        next(err);
    }
});
exports.userRouter.get("/getProfile", auth_middleware_1.authenticationMiddleware, user_controller_1.getProfile);
