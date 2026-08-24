import { NextFunction, Request, Response, Router } from "express";
import { CustomerRepository } from "../repositories/customer.repo";
import { deleteAdress } from "../repositories/address.repos";
import { ResturantRepository } from "../repositories/resturant.repos";

export const customerRouter = Router()

customerRouter.delete("/deleteAllUsers", async(req : Request, res : Response, next : NextFunction) => {
    try{
        const custoRepo = new CustomerRepository()
        const restroRepo = new ResturantRepository()
        const resturants = await restroRepo.deleteResturants()
        const users = await custoRepo.deleteCustomer()
        const addresses = await deleteAdress()
        res.json({users, resturants, addresses})
    }
    catch(err){
        
    }
})