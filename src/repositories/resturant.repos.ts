import { Repository } from "typeorm";
import { Resturant } from "../database/Entity/resturant.entity";
import { AppDataSource } from "../database/connect";
import { IResturantSignUp } from "../interface/interfaces";


export class ResturantRepository {
    resturantRepo : Repository<Resturant>
    constructor(){
        this.resturantRepo = AppDataSource.getRepository(Resturant)
    }

    public findResturant = async (owner_name : string, resturant_name: string, IsPassword : boolean = false) : Promise<Resturant> => {
        const resturant = await this.resturantRepo.findOne({
            where : {
                owner_name : owner_name,
                resturant_name : resturant_name
            },
            select : {
                resturant_id : true,
                resturant_name : true,
                status : true,
                password : IsPassword ? true : false,
                address : {
                    city : true,
                    ward_num : true,
                    phone_number1 : true,
                    street_name : true
                },
                approval_status : true,
                approved_by : true,
                created_at : true
            },
            relations : {
                address : true
            }
        })
        return resturant
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