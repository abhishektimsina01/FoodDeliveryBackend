import { NextFunction, Request, Response, Router } from "express";
import { CustomerRepository } from "../repositories/customer.repo";
import { deleteAdress } from "../repositories/address.repos";
import { ResturantRepository } from "../repositories/resturant.repos";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import { getProfile } from "../controller/user.controller";

export const userRouter = Router()

userRouter.delete("/deleteAllUsers", async(req : Request, res : Response, next : NextFunction) => {
    try{
        const custoRepo = new CustomerRepository()
        const restroRepo = new ResturantRepository()
        const resturants = await restroRepo.deleteResturants()
        const users = await custoRepo.deleteCustomer()
        const addresses = await deleteAdress()
        res.clearCookie("access_token").clearCookie("refresh_token")
        res.json({users, resturants, addresses})
    }
    catch(err){
        next(err)
    }
})
userRouter.get("/getProfile", authenticationMiddleware, getProfile)