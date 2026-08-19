import {DataSource} from "typeorm"
import { getEnvProperty } from "../utils/get.env.utils.js"


export const connectToDatabase = async(): Promise<boolean> => {
    let count = 1
    const AppDataSource = new DataSource({
        type : "mysql",
        host : "localhost",
        username : getEnvProperty("db_username"),
        password : getEnvProperty("db_password"),
        database : "FoodDelivery",
        port : 3306,
        entities : [],
        synchronize : true,
    })
    while(count <= 5){
        try{
            await AppDataSource.initialize()
            console.log("Database Connected successfully✅.")
            return true
        }
        catch(err){
            console.log(`${count} failed to connect.`)
            console.log(err.message)
            count++
        }
    }
    return false
}