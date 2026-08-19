import express from "express"
import { Express } from "express"
import {getEnvProperty} from "./utils/get.env.utils.js"
import { connectToDatabase } from "./database/connect.js"
import { DatabaseException } from "./exception/exception.js"
import { HTTP_STATUS } from "./constants/http-status.constants.js"
import { serverMiddleware } from "./middleware/server.middleware.js"
import { serverRoute } from "./routes/server.routes.js"

export const appConfiguration = async() => {
   try{
    const app : Express = express()
    const db_status = await connectToDatabase()
    if(!db_status){
        throw new DatabaseException("Database couldnot be connected❌.", HTTP_STATUS.SERVER_ERROR.INTERNAL_SERVER_ERROR.CODE)
    }
    serverMiddleware(app)
    serverRoute(app)
    app.listen(getEnvProperty("port"), (err) => {
        if(err){
            console.log(`${err.name}, ${err.message} occurred.`)
            console.log("server couldnot start❌")
        }
        else{
            console.log("Server started successfully✅.")
        }
    })
   }
   catch(err){
    console.log(err.message)
   }
}