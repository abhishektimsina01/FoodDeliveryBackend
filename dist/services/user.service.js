"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const role_helper_1 = require("../Helper/role.helper");
const customer_repo_1 = require("../repositories/customer.repo");
const resturant_repos_1 = require("../repositories/resturant.repos");
class UserService {
    customerRepo;
    resturantRepo;
    roleHelper;
    constructor() {
        this.customerRepo = new customer_repo_1.CustomerRepository();
        this.resturantRepo = new resturant_repos_1.ResturantRepository();
        this.roleHelper = new role_helper_1.RoleHelper();
    }
    getProfileService = async (userData) => {
        try {
            const { id, username, role } = userData;
            console.log(userData);
            if (this.roleHelper.isAdmin(role)) {
                // send data that is required for the admin
            }
            else if (this.roleHelper.isCustomer(role)) {
                // send data that is required for the customer
                const customer = await this.customerRepo.findCustomer("customer_id", id);
                return customer;
            }
            else if (this.roleHelper.isResturant(role)) {
                // send data that is required for the resturant
                const resturant = await this.resturantRepo.findResturant("resturant_id", id);
                console.log(resturant.created_at);
                return resturant;
            }
        }
        catch (err) {
            throw err;
        }
    };
}
exports.UserService = UserService;
