import { NextFunction, Request, Response } from "express"
import { SendAPIResponse } from "../utils/response.utils"
import { HTTP_STATUS } from "../constants/http-status.constants"
import { UserService } from "../services/user.service"

const userService = new UserService()

export const getProfile = async (req : Request, res : Response, next : NextFunction) => {
    try{
        const {id, username, role} = req.user
        const response = await userService.getProfileService({id, username, role})
        return SendAPIResponse(res, HTTP_STATUS.SUCCESS.OK.CODE, "Profile fetched", response)
    }
    catch(err){
        next(err)
    }
}