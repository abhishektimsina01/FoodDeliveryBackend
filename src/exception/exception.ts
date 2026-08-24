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

export class APIError<T> extends Error {
    statusCode : number
    details : genericAndNull<T>
    constructor(message : string, statusCode : number, details : genericAndNull<T> = null){
        super(message)
        this.name = "APIError"
        this.statusCode = statusCode
        this.details = details
    }
}

// export class ValidationError<T> extends Error{
//     name : string
//     message : string
//     statusCode : number
//     details : genericAndNull<T>

//     constructor(error : Joi.ValidationError){
//         super(error.message)
//         this.name = "ValidationError"
//         this.message = error.message
//         this.statusCode = HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE
//         this.details = { 
//             type : error.details[0].type,
//             context : error.details[0].context
//         }

//     }
// }