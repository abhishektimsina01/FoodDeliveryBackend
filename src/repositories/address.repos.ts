import { AppDataSource } from "../database/connect";
import { Address } from "../database/Entity/address.entity";
import { IAddress } from "../interface/interfaces";

export const addAddress = async (address : IAddress): Promise<number> => {
    const addressRepo = AppDataSource.getRepository(Address)
    const data =  addressRepo.create(address)
    console.log(data)
    const new_address : Address = await addressRepo.save(data)
    console.log("*")
    console.log(new_address)
    return new_address.address_id
}