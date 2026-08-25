import { HTTP_STATUS } from "../constants/http-status.constants";
import { Role } from "../enums/enums";
import { APIError } from "../exception/exception";
import { RoleHelper } from "../Helper/role.helper";
import { ResturantRepository } from "../repositories/resturant.repos";
import { IResturantFilterType, IuserData } from "../types/types";

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
            const resturants = await this.resturantRepo.findResturant(role as Exclude<Role, Role.RESTURANT>, filter)
            return resturants
        }
    
        else if(this.roleHelper.isCustomer(role)){
                 const resturants = await this.resturantRepo.findResturants(role as Exclude<Role, Role.RESTURANT>, {...filter, approved_status : true})
                 return resturants
            // what will the customer see
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

    public updateResturant = async() => {

    }

    public deleteResturant = async() => {
        
    }

}