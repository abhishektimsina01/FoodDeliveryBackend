import dotenv from "dotenv"
import { APIError } from "../exception/exception"
import { HTTP_STATUS } from "../constants/http-status.constants"
dotenv.config()

export const getEnvProperty = (key : string): string => {
    if(Object.keys(process.env).includes(key)){
        const value = process.env[key]
        if(value != undefined && value != ""){
            return value
        }
    }
    throw new APIError(`Environment Variable ${key} not found.`, HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE)
}