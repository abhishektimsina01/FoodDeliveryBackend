import { IjwtData, IPayload } from "../interface/interfaces";
import jwt from "jsonwebtoken"
import { roleType } from "../types/types";
import { getEnvProperty } from "./get.env.utils";
import { AuthenticationError } from "../exception/exception";

export const generateToken = (userInfo : IjwtData, role : roleType) => {
    const access_token = jwt.sign({...userInfo, role}, getEnvProperty("access_token_secret_key"),{
        expiresIn : "1d"
    })
    const refresh_token = jwt.sign({id : userInfo.id, role}, getEnvProperty("refresh_token_secret_key"),{
        expiresIn : "30d"
    })
    return {access_token, refresh_token}
}

export const verifyToken = (access_token : string) => {
    try{
        const payload = jwt.verify(access_token, getEnvProperty("access_token_secret_key"))
        return payload as IPayload
    }
    catch(err){
        if(err instanceof jwt.TokenExpiredError){
            throw new AuthenticationError("TOKEN_EXPIRED", "Token has expired, please refresh")
        }
        else if(err instanceof jwt.NotBeforeError){
            throw new AuthenticationError("TOKEN_NOT_READY", "Token has expired")
        }
        else{
            throw new AuthenticationError("TOKEN_INVALID", "Token has been tampered")
        }
    }
}