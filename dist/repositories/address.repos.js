"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAdress = exports.addAddress = void 0;
const typeorm_1 = require("typeorm");
const connect_1 = require("../database/connect");
const address_entity_1 = require("../database/Entity/address.entity");
const exception_1 = require("../exception/exception");
const http_status_constants_1 = require("../constants/http-status.constants");
const addAddress = async (address) => {
    try {
        const addressRepo = connect_1.AppDataSource.getRepository(address_entity_1.Address);
        const data = addressRepo.create(address);
        const new_address = await addressRepo.save(data);
        return new_address.address_id;
    }
    catch (err) {
        if (err instanceof typeorm_1.QueryFailedError) {
            const APIerror = new exception_1.APIError(err.message, http_status_constants_1.HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, err.driverError);
            throw APIerror;
        }
    }
};
exports.addAddress = addAddress;
const deleteAdress = async () => {
    const addressRepo = connect_1.AppDataSource.getRepository(address_entity_1.Address);
    const address = await addressRepo.find();
    await addressRepo.remove(address);
    return address;
};
exports.deleteAdress = deleteAdress;
