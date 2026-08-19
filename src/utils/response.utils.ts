import { Response } from "express";

export const SendErrorResponse = (res : Response,message : string, statusCode : number, details : Object | null | string): Response<any, Record<string, any>> => {    
    return res.json({
        success : true,
        statusCode : statusCode,
        message : message,
        error : {
            code : statusCode,
            details : details
        }
    })
}

export const SendAPIResponse= <T>(res : Response, statusCode : number, message : string, data : T | T[]): Response<any, Record<string, any>> => {
    return res.json({
        success : true,
        statusCode : statusCode,
        message : message,
        data : data
    })
}

