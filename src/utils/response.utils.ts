import { Response } from "express";
import { genericAndNull } from "../types/types";

export const SendErrorResponse = <T>(res : Response, message : string, statusCode : number, details : genericAndNull<T>) => {    
    return res.json({
        success : false,
        statusCode : statusCode,
        message : message,
        error : {
            code : statusCode,
            details : details
        }
    })
}

export const SendAPIResponse= <T>(res : Response, statusCode : number, message : string, data : genericAndNull<T>) => {
    return res.json({
        success : true,
        statusCode : statusCode,
        message : message,
        data : data
    })
}