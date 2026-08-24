import { NextFunction, Request, Response } from "express";
import { customerLogInSchem, customerSignUpSchema } from "../validation/customer.validation";
import { APIError } from "../exception/exception";
import { HTTP_STATUS } from "../constants/http-status.constants";
import { AuthService } from "../services/auth.service";
import { ICustomerSignUp} from "../interface/interfaces";
import { SendAPIResponse } from "../utils/response.utils";
import { ResturantLogInSchema, ResturantSignUpSchema } from "../validation/resturant.validation";
import { setCookie } from "../utils/cookie.utils";

const authService = new AuthService()

export const CustomerSignUp = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const {error} = customerSignUpSchema.validate(req.body)
        if(error){
            throw new APIError(error.message, HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, {
                type : error.details[0].type,
                context : error.details[0].context
            })
        }
        req.body.address.phone_number1 = parseInt(req.body.address.phone_number1)
        const userBody : ICustomerSignUp = req.body
        const response = await authService.customerSignUpService(userBody)
        setCookie(res, "access_token", response.access_token)
        setCookie(res, "refresh_token", response.refresh_token)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "User registered", response)
    }
    catch(err){
        next(err)
    }
}


export const CustomerLogIn = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const {error} = customerLogInSchem.validate(req.body)
        if(error){
            throw new APIError(error.message, HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, {
                type : error.details[0].type,
                context : error.details[0].context
            })
        }
        const response = await authService.customerLogInService(req.body)
        setCookie(res, "access_token", response.access_token)
        setCookie(res, "refresh_token", response.refresh_token)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "User loggedIn", response)   
    }
    catch(err){
        next(err)
    }
}

export const ResturantSignUp = async (req : Request, res : Response, next : NextFunction) => {
    try{
        console.log(req.cookies?.access_token)
        const {error} = ResturantSignUpSchema.validate(req.body)
        if(error){
            throw new APIError(error.message, HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, {
                type : error.details[0].type,
                context : error.details[0].context
            })
        }
        const response = await authService.ResturantSignUpService(req.body)
        setCookie(res, "access_token", response.access_token)
        setCookie(res, "refresh_token", response.refresh_token)
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "Resturant created",  response)
    }
    catch(err){
        next(err)
    }
}

export const ResturantLogIn = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const {error} = ResturantLogInSchema.validate(req.body)
        if(error){
            throw new APIError(error.message, HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, {
                type : error.details[0].type,
                context : error.details[0].context
            })
        }
        const response = await authService.ResturantLogInService(req.body)
        setCookie(res, "access_token", response.access_token)
        setCookie(res, "refresh_token", response.refresh_token)        
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "you are loggedIn", response)
    }
    catch(err){
        next(err)
    }
}

export const LogOut = (req : Request, res : Response, next : NextFunction) => {
    res.clearCookie("access_token")
    res.clearCookie("refresh_token")
    return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "you are logged out")
}