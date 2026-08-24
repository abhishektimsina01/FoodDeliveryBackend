import {DataSource} from "typeorm"
import { getEnvProperty } from "../utils/get.env.utils.js"
import { DatabaseException } from "../exception/exception.js"
import { HTTP_STATUS } from "../constants/http-status.constants.js"
import { Admin } from "./Entity/admin.entity.js"
import { Customer } from "./Entity/customer.entity.js"
import { Resturant } from "./Entity/resturant.entity.js"
import { DeliveryPerson } from "./Entity/delivery_person.entity.js"
import { Delivery } from "./Entity/delivery.entity.js"
import { Order } from "./Entity/order.entity.js"
import { Menu } from "./Entity/menu.entity.js"
import { Transaction } from "./Entity/transaction.entity.js"
import { Address } from "./Entity/address.entity.js"
import { OrderItem } from "./Entity/ManyToMany/order_item.entity.js"


export const AppDataSource = new DataSource({
    type : "mysql",
    host : "localhost",
    username : getEnvProperty("db_username"),
    password : getEnvProperty("db_password"),
    database : "FoodDelivery",
    port : 3306,
    entities : [
        Address, 
        Admin,
        Customer, 
        Resturant, 
        DeliveryPerson, 
        Delivery, 
        Order, 
        Menu, 
        Transaction, 
        OrderItem],
    synchronize : false,
})

export const connectToDatabase = async() => {
    let count = 1
    let status = false
    while(count <= 5){
        try{
            await AppDataSource.initialize()
            console.log("Database Connected successfully✅.")
            status = true
            break
        }
        catch(err){
            console.log(`${count} failed to connect.`)
            // console.log(err)
            status = false
            count++
        }
    }
    if(!status){
            throw new DatabaseException("Database couldnot be connected❌.", HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE, )
    }
}