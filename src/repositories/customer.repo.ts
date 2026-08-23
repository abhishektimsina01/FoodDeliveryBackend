import { Repository } from "typeorm";
import { AppDataSource } from "../database/connect";
import { Customer } from "../database/Entity/customer.entity";
import { ICustomerSignUp } from "../interface/interfaces";


export class CustomerRepository {
    customerRepo : Repository<Customer>
    constructor(){
        this.customerRepo = AppDataSource.getRepository(Customer)
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
}