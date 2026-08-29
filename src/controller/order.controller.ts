import { NextFunction, Request, Response } from "express";
import { IRestroParams } from "../interface/interfaces";
import { createOrderSchema } from "../validation/order.validation";
import { ValidationError } from "../exception/exception";
import { OrderService } from "../services/order.service";
import { SendAPIResponse } from "../utils/response.utils";
import { HTTP_STATUS } from "../constants/http-status.constants";


const orderService = new OrderService()

export const createOrder = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const {error} = createOrderSchema.validate(req.body)
        if(error){
            throw new ValidationError(error)
        }
        const response = await orderService.createOrder(req.user, req.body)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "order made", response)
    }
    catch(err){
        next(err)
    }
}

export const deleteOrders = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const response = await orderService.deleteOrders()
        console.log(response)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "deleted", response)
    }
    catch(err){
        next(err)
    }
}

export const getOrder = async (req : Request<IRestroParams>, res : Response, next : NextFunction) => {
    try{
        // just fetch the order
    }
    catch(err){
        next(err)
    }
}

export const getOrders = async (req : Request, res : Response, next : NextFunction) => {
    try{
        // just fetch all orders
    }
    catch(err){
        next(err)
    }
}