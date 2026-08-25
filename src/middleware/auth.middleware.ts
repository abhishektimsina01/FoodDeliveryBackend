import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../exception/exception";
import { verifyToken } from "../utils/jwt.utils";
import { IPayload } from "../interface/interfaces";
import { CustomerRepository } from "../repositories/customer.repo";
import { Role } from "../enums/enums";
import { ResturantRepository } from "../repositories/resturant.repos";

export const authenticationMiddleware = async(req : Request, res : Response, next : NextFunction) => {
    try{
        const customerRepo = new CustomerRepository()
        const restroRepo = new ResturantRepository()
        const access_token = req.cookies?.access_token
        if(!access_token){
            throw new AuthenticationError("TOKEN_NOT_FOUND", "token not found")
        }
        const payload : IPayload = verifyToken(access_token)
        let IsUser : boolean | Object
        if(payload.role == Role.CUSTOMER){
            IsUser = await customerRepo.checkCustomer("id", payload.id)
        }
        else if(payload.role == Role.RESTURANT){
            IsUser = await restroRepo.checkResturant(payload.id)
        }
        if(IsUser){
            throw new AuthenticationError("USER_NOT_FOUND", "seems like the users doesnot exist")
        }
        req.user = {
            id : payload.id,
            username : payload.username,
            role : payload.role
        }
        next()
    }
    catch(err){
        next(err)
    }
}