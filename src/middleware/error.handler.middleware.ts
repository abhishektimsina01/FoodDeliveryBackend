import { NextFunction, Request, Response } from "express";
import { APIError } from "../exception/exception";
import { HTTP_STATUS } from "../constants/http-status.constants";
import { SendErrorResponse } from "../utils/response.utils";

// not found api
export const notFound = (req : Request, res : Response, next : NextFunction) => {
    // pass it to the errorHanlder after making the error
    const err =  new APIError(`page not found`, HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE, {
        url : req.originalUrl,
        method : req.method
    })
    next(err)
}

// error passed to it
export const errorHandler = (err : any, req: Request, res : Response, next : NextFunction) => {
    // respond the error to the frontend
    if(err instanceof APIError){
        SendErrorResponse(res, err.message, err.statusCode, err.details)
    }
}