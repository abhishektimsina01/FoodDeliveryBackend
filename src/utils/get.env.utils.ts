import dotenv from "dotenv"
dotenv.config()

export const getEnvProperty = (key : string): string => {
    if(Object.keys(process.env).includes(key)){
        const value = process.env[key]
        if(value != undefined && value != ""){
            return value
        }
    }
    throw new Error(`Environment Variable ${key} not found.`)
}