"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResturantService = void 0;
const http_status_constants_1 = require("../constants/http-status.constants");
const enums_1 = require("../enums/enums");
const exception_1 = require("../exception/exception");
const role_helper_1 = require("../Helper/role.helper");
const resturant_repos_1 = require("../repositories/resturant.repos");
const filterPurifier_utils_1 = require("../utils/filterPurifier.utils");
class ResturantService {
    resturantRepo;
    roleHelper;
    constructor() {
        this.resturantRepo = new resturant_repos_1.ResturantRepository();
        this.roleHelper = new role_helper_1.RoleHelper();
    }
    getResturants = async (userData, filter) => {
        const { id, role } = userData;
        if (this.roleHelper.isAdmin(role)) {
            // what will the admin see
            const purifiedFilter = (0, filterPurifier_utils_1.purifyResturantFilter)(filter, role);
            const resturants = await this.resturantRepo.findResturants(role, { ...purifiedFilter });
            return resturants;
        }
        else if (this.roleHelper.isCustomer(role)) {
            const purifiedFilter = (0, filterPurifier_utils_1.purifyResturantFilter)(filter, role);
            const resturants = await this.resturantRepo.findResturants(role, { ...purifiedFilter, approval_status: enums_1.RESTURANT_IS_APPROVED.RESTURANT_APPROVED });
            return resturants;
        }
    };
    getResturant = async (userData, resturantId) => {
        const { id, username, role } = userData;
        const resturant = await this.resturantRepo.findResturantDetailed("resturant_id", +resturantId, role);
        if (!resturant) {
            throw new exception_1.APIError("resturant not found", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE);
        }
        return resturant;
    };
    updateResturant = async (userData, resturantData) => {
        const { id } = userData;
        console.log(id);
        const resturant = await this.resturantRepo.findResturant("resturant_id", +id);
        if (!resturant) {
            throw new exception_1.APIError("no resturant found", 404);
        }
        if (Object.keys(resturantData).length == 0) {
            throw new exception_1.APIError("no data sent", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE);
        }
        else {
            console.log(resturant);
            const updateResturantData = {
                owner_name: resturantData.owner_name ?? resturant.owner_name,
                resturant_name: resturantData.resturant_name ?? resturant.resturant_name,
                status: resturantData.status ?? resturant.status
            };
            console.log(updateResturantData);
            const updatedResturant = await this.resturantRepo.updateResturant(updateResturantData, id);
            return updatedResturant;
        }
    };
    updateResturantAdmin = async (userData, resturantData, resturantId) => {
        const { id } = userData;
        const resturant = await this.resturantRepo.findResturant("resturant_id", +resturantId);
        if (!resturant) {
            throw new exception_1.APIError("resturant not found", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE);
        }
        if (Object.keys(resturantData).length == 0) {
            throw new exception_1.APIError("no data sent", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE);
        }
        const updatedResturant = await this.resturantRepo.updateResturant(resturantData, +resturantId);
        return updatedResturant;
    };
    deleteResturant = async (resturantId) => {
        const resturant = await this.resturantRepo.checkResturant(+resturantId);
        if (resturant) {
            throw new exception_1.APIError("Resturant not found", http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE);
        }
        const deletedResturant = await this.resturantRepo.deleteResturant(+resturantId);
        return deletedResturant;
    };
}
exports.ResturantService = ResturantService;
