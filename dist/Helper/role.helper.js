"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleHelper = void 0;
const enums_1 = require("../enums/enums");
class RoleHelper {
    isAdmin = (role) => {
        return (role == enums_1.Role.ADMIN) ? true : false;
    };
    isCustomer = (role) => {
        return (role == enums_1.Role.CUSTOMER) ? true : false;
    };
    isResturant = (role) => {
        return (role == enums_1.Role.RESTURANT) ? true : false;
    };
    isDeliveryPerson = (role) => {
        return (role == enums_1.Role.DELIVERY) ? true : false;
    };
}
exports.RoleHelper = RoleHelper;
