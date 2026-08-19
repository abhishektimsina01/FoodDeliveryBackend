// exception for custom errors for proper error management and not the general form

import { genericAndNull } from "../types/types"

export class DatabaseException extends Error {
    statusCode : number
    name : string
    constructor(message : string, statusCode : number){
        super(message)
        this.name = "DatabaseException"
        this.statusCode = statusCode
    }
}

export class APIError<T> extends Error {
    statusCode : number
    details : genericAndNull<T>
    constructor(message : string, statusCode : number, details : genericAndNull<T>){
        super(message)
        this.name = "APIError"
        this.statusCode = statusCode
        this.details = details
    }
}