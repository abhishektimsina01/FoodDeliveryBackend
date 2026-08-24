import { Response } from "express"


export const setCookie = (res : Response, key : string, value : string) => {
    res.cookie(key, value, {
        maxAge : (key == "access_token") ? 1000*60*60*24 : 1000*60*60*24*30,
        httpOnly : true,
        sameSite : "strict",
        secure : true
    })
}