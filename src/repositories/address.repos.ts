import { QueryFailedError } from "typeorm";
import { AppDataSource } from "../database/connect";
import { Address } from "../database/Entity/address.entity";
import { IAddress } from "../interface/interfaces";
import { APIError } from "../exception/exception";
import { HTTP_STATUS } from "../constants/http-status.constants";

export const addAddress = async (address : IAddress) => {
    try{
        const addressRepo = AppDataSource.getRepository(Address)
        const data =  addressRepo.create(address)
        const new_address : Address = await addressRepo.save(data)
        return new_address.address_id
    }
    catch(err){
        if(err instanceof QueryFailedError){
            const APIerror = new APIError(err.message, HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, err.driverError)
            throw APIerror
        }
    }
}

export const deleteAdress = async () => {
    const addressRepo = AppDataSource.getRepository(Address)
    const address = await addressRepo.find()
    await addressRepo.remove(address)
    return address
}