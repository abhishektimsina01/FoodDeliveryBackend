import { Response } from "express";
import { genericAndNull } from "../types/types";

export const SendErrorResponse = <T>(res : Response, message : string, statusCode : number, details : genericAndNull<T> = null) => {    
    return res.status(statusCode).json({
        success : false,
        statusCode : statusCode,
        message : message,
        details : details
    })
}

export const SendAPIResponse= <T>(res : Response, statusCode : number, message : string, data : genericAndNull<T> = null) => {
    return res.status(statusCode).json({
        success : true,
        statusCode : statusCode,
        message : message,
        data : data
    })
}