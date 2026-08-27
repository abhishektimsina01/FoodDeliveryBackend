import { NextFunction, Request, Response } from "express";
import { IRestroParams } from "../interface/interfaces";
import { createMenuSchema } from "../validation/item_menu.validation";
import { MenuService } from "../services/menu.service";
import { SendAPIResponse } from "../utils/response.utils";
import { HTTP_STATUS } from "../constants/http-status.constants";
import { ValidationError } from "../exception/exception";


const menuService = new MenuService()

export const createItem = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const {error} = createMenuSchema.validate(req.body)
        if(error){
            throw new ValidationError(error)
        }
        const response = await menuService.createItem(req.user, req.body)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "item added", response)
    }
    catch(err){
        next(err)
    }
}

export const getItems = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const response = await menuService.getItems(req.user)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "menu fetched", response)
    }
    catch(err){
        next(err)
    }
}

export const getItem = async (req : Request<IRestroParams>, res : Response, next : NextFunction) => {
    try{
        const response = await menuService.getItem(req.user, +req.params.id)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "Item is fetched", response)
    }
    catch(err){
        next(err)
    }
}
