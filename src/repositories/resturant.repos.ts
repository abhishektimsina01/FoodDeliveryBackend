import { Repository } from "typeorm";
import { Resturant } from "../database/Entity/resturant.entity";
import { AppDataSource } from "../database/connect";
import { IResturantSignUp } from "../interface/interfaces";
import { Role } from "../enums/enums";
import { allResturantsSelect, resturantSelect } from "../constants/project.constants";
import { IResturantFilterType } from "../types/types";


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
            },
        })
        return resturant
    }

    public findResturants = async (role : Exclude<Role, Role.RESTURANT>, filter : IResturantFilterType & { approved_status : boolean}) => {
        const resturants = await this.resturantRepo.find({
            where : {
                ...filter
            },
            select : {
                ...allResturantsSelect[role]
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
}