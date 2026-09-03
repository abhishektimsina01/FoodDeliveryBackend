"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const customer_repo_1 = require("../repositories/customer.repo");
const password_utils_1 = require("../utils/password.utils");
const exception_1 = require("../exception/exception");
const http_status_constants_1 = require("../constants/http-status.constants");
const address_repos_1 = require("../repositories/address.repos");
const enums_1 = require("../enums/enums");
const jwt_utils_1 = require("../utils/jwt.utils");
const resturant_repos_1 = require("../repositories/resturant.repos");
class AuthService {
    custoRepo;
    restroRepo;
    constructor() {
        this.custoRepo = new customer_repo_1.CustomerRepository();
        this.restroRepo = new resturant_repos_1.ResturantRepository();
    }
    customerSignUpService = async (userData) => {
        try {
            const { address, ...userInfo } = userData;
            const IsUser = await this.custoRepo.checkCustomer("email", userInfo.email);
            if (IsUser) {
                throw new exception_1.APIError("user already exist", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.CONFLICT.CODE, {
                    content: "please logIn!!"
                });
            }
            const new_adddress_id = await (0, address_repos_1.addAddress)(address);
            const newUserData = {
                ...userInfo,
                address: new_adddress_id
            };
            const hashedPassword = await (0, password_utils_1.hashPassword)(newUserData.password);
            newUserData.password = hashedPassword;
            const user = await this.custoRepo.createCustomer(newUserData);
            const { password, email, updated_at, ...safeData } = user;
            const { access_token, refresh_token } = (0, jwt_utils_1.generateToken)({ id: user.customer_id, username: user.username }, enums_1.Role.CUSTOMER);
            return {
                safeData,
                access_token,
                refresh_token
            };
        }
        catch (err) {
            throw err;
        }
    };
    customerLogInService = async (userData) => {
        try {
            const user = await this.custoRepo.findCustomer("email", userData.email, true);
            if (!user) {
                throw new exception_1.APIError("User doesnot exist", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE, {
                    content: "user was not found"
                });
            }
            const IsSame = await (0, password_utils_1.checkPassword)(userData.password, user.password);
            if (!IsSame) {
                throw new exception_1.APIError("LogIn credentials wrong", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE, {
                    content: "email or password is wrong"
                });
            }
            const { password, ...safeData } = user;
            const { access_token, refresh_token } = (0, jwt_utils_1.generateToken)({ id: user.customer_id, username: user.username }, enums_1.Role.CUSTOMER);
            return {
                safeData,
                access_token,
                refresh_token
            };
        }
        catch (err) {
            throw err;
        }
    };
    ResturantSignUpService = async (restroData) => {
        try {
            const resturant = await this.restroRepo.findResturant("email", restroData.email, true);
            if (resturant) {
                throw new exception_1.APIError("resturant already created under that name", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.CONFLICT.CODE);
            }
            restroData.password = await (0, password_utils_1.hashPassword)(restroData.password);
            const { address, ...resturant_data } = restroData;
            const new_address_id = await (0, address_repos_1.addAddress)(address);
            const resturantData = {
                ...resturant_data,
                address: new_address_id
            };
            const new_resturant = await this.restroRepo.createResturant(resturantData);
            const { password, ...safeData } = new_resturant;
            const { access_token, refresh_token } = (0, jwt_utils_1.generateToken)({ id: safeData.resturant_id, username: safeData.resturant_name }, enums_1.Role.RESTURANT);
            return {
                safeData,
                access_token,
                refresh_token
            };
        }
        catch (error) {
            throw error;
        }
    };
    ResturantLogInService = async (restroData) => {
        try {
            const resturant = await this.restroRepo.findResturant("email", restroData.email, true);
            if (!resturant) {
                throw new exception_1.APIError("no resturant found", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE);
            }
            if (!await (0, password_utils_1.checkPassword)(restroData.password, resturant.password)) {
                throw new exception_1.APIError("logIn credentials didnot match", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.FORBIDDEN.CODE);
            }
            const { access_token, refresh_token } = (0, jwt_utils_1.generateToken)({ id: resturant.resturant_id, username: resturant.resturant_name }, enums_1.Role.RESTURANT);
            const { password, ...safeData } = resturant;
            return {
                safeData,
                access_token,
                refresh_token
            };
        }
        catch (error) {
            throw error;
        }
    };
}
exports.AuthService = AuthService;
