import { HTTP_STATUS } from "../constants/http-status.constants";
import { RESTURANT_IS_APPROVED, Role } from "../enums/enums";
import { APIError } from "../exception/exception";
import { RoleHelper } from "../Helper/role.helper";
import { IResturantUpdate, IResturantUpdateByAdmin } from "../interface/interfaces";
import { ResturantRepository } from "../repositories/resturant.repos";
import { IResturantFilterType, IuserData } from "../types/types";
import { purifyResturantFilter } from "../utils/filterPurifier.utils";

export class ResturantService {
    resturantRepo : ResturantRepository
    roleHelper : RoleHelper

    constructor(){
        this.resturantRepo = new ResturantRepository()
        this.roleHelper = new RoleHelper()
    }

    public getResturants = async(userData : IuserData, filter : IResturantFilterType) => {
        const {id, role} = userData
        if(this.roleHelper.isAdmin(role)){
            // what will the admin see
            const purifiedFilter : IResturantFilterType = purifyResturantFilter(filter, role)
            const resturants = await this.resturantRepo.findResturant(role as Exclude<Role, Role.RESTURANT>, {...purifiedFilter})
            return resturants
        }
        else if(this.roleHelper.isCustomer(role)){
            const purifiedFilter : IResturantFilterType = purifyResturantFilter(filter, role)
            const resturants = await this.resturantRepo.findResturants(role as Exclude<Role, Role.RESTURANT>, {...purifiedFilter, approval_status : RESTURANT_IS_APPROVED.RESTURANT_APPROVED})
            return resturants
        }
    }

    public getResturant = async(userData : IuserData, resturantId : string) => {
        const {id, username, role} = userData
        const resturant = await this.resturantRepo.findResturantDetailed("resturant_id", +resturantId, role)
        if(!resturant){
            throw new APIError("resturant not found", HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE)
        }
        return resturant
    }

    public updateResturant = async(userData : IuserData, resturantData : IResturantUpdate) => {
        const {id} = userData
        console.log(id)
        const resturant = await this.resturantRepo.findResturant("resturant_id", +id)
        if(Object.keys(resturantData).length == 0){
            throw new APIError("no data sent", HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE)
        }
        else{
            console.log(resturant)
            const updateResturantData = {
                owner_name : resturantData.owner_name ?? resturant.owner_name,
                resturant_name : resturantData.resturant_name ?? resturant.resturant_name,
                status : resturantData.status ?? resturant.status
            }
            console.log(updateResturantData)
            const updatedResturant = await this.resturantRepo.updateResturant(updateResturantData, id)
            return updatedResturant
        }
    }

    public updateResturantAdmin = async (userData : IuserData, resturantData : IResturantUpdateByAdmin, resturantId : string) => {
        const {id} = userData
        const resturant = await this.resturantRepo.findResturant("resturant_id", +resturantId)
        if(!resturant){
            throw new APIError("resturant not found", HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE)
        }
        if(Object.keys(resturantData).length == 0){
            throw new APIError("no data sent", HTTP_STATUS.CLIENT_ERROR.BAD_REQUEST.CODE)            
        }
        const updatedResturant = await this.resturantRepo.updateResturant(resturantData, +resturantId)
        return updatedResturant
    }

    public deleteResturant = async(resturantId : string) => {
        const resturant = await this.resturantRepo.checkResturant(+resturantId)
        if(resturant){
            throw new APIError("Resturant not found", HTTP_STATUS.CLIENT_ERROR.NOT_FOUND.CODE)
        }
        const deletedResturant = await this.resturantRepo.deleteResturant(+resturantId)
        return deletedResturant
    }
}