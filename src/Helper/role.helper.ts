import { Role } from "../enums/enums";

export class RoleHelper {

    public isAdmin = (role : Role) => {
        return (role == Role.ADMIN) ? true : false
    }
    
    public isCustomer = (role : Role) => {
        return (role == Role.CUSTOMER) ? true : false
    }

    public isResturant = (role : Role) => {
        return (role == Role.RESTURANT) ? true : false
    }

    public isDeliveryPerson = (role : Role) => {
        return (role == Role.DELIVERY) ? true : false
    }

}