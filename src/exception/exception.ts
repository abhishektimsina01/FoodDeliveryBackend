// exception for custom errors for proper error management and not the general form

export class DatabaseException extends Error {
    statusCode : number
    name : string

    constructor(message : string, statusCode : number){
        super(message)
        this.name = "DatabaseException"
        this.statusCode = statusCode
    }
}

export class APIError extends Error {
    statusCode : number
    details : string | null

    constructor(message : string, statusCode : number, details : string | null){
        super(message)
        this.name = "APIError"
        this.statusCode = statusCode
        this.details = details
    }
}