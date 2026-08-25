// exception for custom errors for proper error management and not the general form
import Joi from "joi"
import { HTTP_STATUS } from "../constants/http-status.constants"
import { genericAndNull } from "../types/types"

export class DatabaseException<T> extends Error {
    statusCode : number
    name : string
    details : genericAndNull<T>

    constructor(message : string, statusCode : number, details : genericAndNull<T> = null){
        super(message)
        this.name = "DatabaseException"
        this.statusCode = statusCode
        this.details = details
    }
}

export class APIError extends Error {
    statusCode : number
    details : any
    constructor(message : string, statusCode : number, details : any = null){
        super(message)
        this.name = "APIError"
        this.statusCode = statusCode
        this.details = details
    }
}

export class ValidationError extends APIError{
    constructor(error : Joi.ValidationError){
        super(error.message, HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE, { 
            type : error.details[0].type,
            context : error.details[0].context
        })
        this.name = "VALIDATION_ERROR"
    }
}

export class AuthenticationError extends APIError{
    constructor(name : string, message : string){
        super(message, HTTP_STATUS.CLIENT_ERROR.UNAUTHORIZED.CODE)
        this.name = name
    }
}