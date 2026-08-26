import { NextFunction, Request, Response } from "express"
import { ResturantService } from "../services/resturants.service"
import { IRestroParams } from "../interface/interfaces"
import { SendAPIResponse } from "../utils/response.utils"
import { HTTP_STATUS } from "../constants/http-status.constants"

const resturantService = new ResturantService()
export const getResturants = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const {id, username, role} = req.user
        const filter = req.query
        const response = await resturantService.getResturants({id, username, role}, filter)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "Resturants fetched", response)
    }
    catch(err){
        next(err)
    }
}

export const getResturant = async (req : Request<IRestroParams>, res : Response, next : NextFunction) => {
    try{
        const {id, username, role} = req.user
        const resturantId = req.params.id
        const response = await resturantService.getResturant({id, username, role}, resturantId)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "Resturant fetched", response)
    }
    catch(err){
        next(err)
    }
}

export const updateResturant = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const {id, username, role} = req.user
        const resturantData = req.body
        const response = await resturantService.updateResturant({id, username, role}, resturantData)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "Resturant updated", response)
    }
    catch(err){
        next(err)
    }
}

export const updateResturantAdmin = async (req : Request<IRestroParams>, res : Response, next : NextFunction) => {
    try{
        const response = await resturantService.updateResturantAdmin(req.user, req.body, req.params.id)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "resturant updated", response)
    }
    catch(err){
        next(err)
    }
}

export const deleteResturant = async (req : Request<IRestroParams>, res : Response, next : NextFunction) => {
    try{
        const resturantId = req.params.id
        const resturant = await resturantService.deleteResturant(resturantId)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "Resturant deleted", resturant)
    }
    catch(err){
        next(err)
    }
}