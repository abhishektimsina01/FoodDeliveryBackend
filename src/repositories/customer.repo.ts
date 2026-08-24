import { Repository } from "typeorm";
import { AppDataSource } from "../database/connect";
import { Customer } from "../database/Entity/customer.entity";
import { ICustomerSignUp } from "../interface/interfaces";


export class CustomerRepository {
    customerRepo : Repository<Customer>
    constructor(){
        this.customerRepo = AppDataSource.getRepository(Customer)
    }

    public findCustomer = async <T>(key : string, value : T, IsPassword : boolean = false) => {
        if(key == "email" || key == "customer_id"){
            const userData = await this.customerRepo.findOne({
                where : {
                    [`${key}`] : value
                },
                select : {
                    customer_id : true,
                    username : true,
                    email : true,
                    password : IsPassword ? true : false,
                    created_at : true,
                    address : {
                        city : true,
                        phone_number1 : true,
                        street_name : true
                    }
                },
                relations : {
                    address : true
                }
            })
            return userData
        }
    }

    public checkCustomer = async <T>(key : string, value : T) => {
        const IsUser = await this.customerRepo.exists({
            where : {
                [`${key}`] : value
            }
        })
        return IsUser
    }

    public createCustomer = async (userData : Omit<ICustomerSignUp, "address">) => {
        try{
            const user = this.customerRepo.create(userData)
            const saved_user = await this.customerRepo.save(user)
            return saved_user
        }
        catch(err){
            throw err
        }
    }

    public deleteCustomer = async (): Promise<Customer[]> => {
        const users = await this.customerRepo.find()
        await this.customerRepo.remove(users)
        return users
    }
}