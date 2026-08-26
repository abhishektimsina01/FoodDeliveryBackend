import { Repository } from "typeorm";
import { Resturant } from "../database/Entity/resturant.entity";
import { AppDataSource } from "../database/connect";
import { IResturantSignUp, IResturantUpdate } from "../interface/interfaces";
import { RESTURANT_IS_APPROVED, Role } from "../enums/enums";
import { allResturantsSelect, resturantSelect } from "../constants/project.constants";
import { IResturantFilterType, IResturantUpdateType } from "../types/types";


export class ResturantRepository {
    resturantRepo : Repository<Resturant>
    constructor(){
        this.resturantRepo = AppDataSource.getRepository(Resturant)
    }

    public findResturantDetailed = async <T>(key : string, value : T, role : Role ) => {
        const resturant = await this.resturantRepo.findOne({
            where : {
                [`${key}`] : value
            },
            select : {
                ...resturantSelect[role]
            },
            relations : {
                address : true,
                items : true,
                orders : true
            }
        })
        return resturant
    }

    // signUp garda kheri
    public findResturant =  async <T>(key : string, value : T, IsPassword : boolean = false) : Promise<Resturant> => {
        const resturant = await this.resturantRepo.findOne({
            where : {
                [`${key}`] : value
            },
            select : {
                resturant_id : true,
                resturant_name : true,
                status : true,
                password : (IsPassword) ? true : false,
                approval_status : true,
                approved_by : true,
                created_at : true
            },
        })
        return resturant
    }

    public findResturants = async (role : Exclude<Role, Role.RESTURANT>, filter : IResturantFilterType & { approval_status : RESTURANT_IS_APPROVED.RESTURANT_APPROVED}) => {
        const resturants = await this.resturantRepo.find({
            where : {
                ...filter
            },
            select : {
                ...allResturantsSelect[role]
            },
            relations : {
                address : true
            }
        })
        return resturants
    }

    public checkResturant = async (id : number) => {
        const IsResturant = await this.resturantRepo.exists({
            where : {
                resturant_id : id as number
            }
        })
        return IsResturant 
    }

    public createResturant = async (restrodData : Omit<IResturantSignUp, "address">) => {
        const resturant = this.resturantRepo.create(restrodData)
        return await this.resturantRepo.save(resturant)
    }

    public deleteResturants = async () => {
        const resturants = await this.resturantRepo.find()
        await this.resturantRepo.remove(resturants)
        return resturants
    }

    public updateResturant = async (restroData : IResturantUpdateType, resturant_id : number) => {
        await this.resturantRepo.update({
            resturant_id : resturant_id
        },
        {
            ...restroData
        })
        const resturant = await this.findResturant("resturant_id", resturant_id)
        return resturant
    }

    public deleteResturant = async (resturant_id : number) => {
        const resturant = await this.findResturant("resturant_id", resturant_id)
        await this.resturantRepo.remove(resturant)
        return resturant
    }
}