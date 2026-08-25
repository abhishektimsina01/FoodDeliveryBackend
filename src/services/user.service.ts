import { Role } from "../enums/enums";
import { RoleHelper } from "../Helper/role.helper";
import { IjwtData } from "../interface/interfaces";
import { CustomerRepository } from "../repositories/customer.repo";
import { ResturantRepository } from "../repositories/resturant.repos";


export class UserService {
    customerRepo : CustomerRepository
    resturantRepo : ResturantRepository
    roleHelper : RoleHelper
    constructor(){
        this.customerRepo = new CustomerRepository()
        this.resturantRepo = new ResturantRepository()
        this.roleHelper = new RoleHelper()
    }

    public getProfileService = async(userData : IjwtData & { role : Role}) => {
        try{
            const {id, username, role} = userData

            if(this.roleHelper.isAdmin(role)){
                // send data that is required for the admin
            }

            else if(this.roleHelper.isCustomer(role)){
                // send data that is required for the customer
                const customer = await this.customerRepo.findCustomer("customer_id", id)
                return customer
            }

            else if(this.roleHelper.isResturant(role)){
                // send data that is required for the resturant
                const resturant = await this.resturantRepo.findResturant(id)
                return resturant
            }

            else{
                // send data that is required for the delivery person
            }
        }
        catch(err){
            throw err
        }
    }
}