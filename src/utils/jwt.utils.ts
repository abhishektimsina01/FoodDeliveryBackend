import { IjwtData } from "../interface/interfaces";
import jwt from "jsonwebtoken"
import { roleType } from "../types/types";
import { getEnvProperty } from "./get.env.utils";

export const generateToken = (userInfo : IjwtData, role : roleType) => {
    const access_token = jwt.sign({...userInfo, role}, getEnvProperty("access_token_secret_key"),{
        expiresIn : "1d"
    })
    const refresh_token = jwt.sign({id : userInfo.id, role}, getEnvProperty("refresh_token_secret_key"),{
        expiresIn : "30d"
    })
    return {access_token, refresh_token}
}