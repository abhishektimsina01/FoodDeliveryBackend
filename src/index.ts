import express from "express"
import { Express } from "express"
import {getEnvProperty} from "./utils/get.env.utils.js"
import { connectToDatabase } from "./database/connect.js"
import { serverMiddleware } from "./middleware/server.middleware.js"
import { serverRoute } from "./routes/server.routes.js"


export const appConfiguration = async() => {
   try{
    const app : Express = express()
    await connectToDatabase()
    serverMiddleware(app)
    serverRoute(app)
    app.listen(getEnvProperty("port"), (err) => {
        if(err){
            console.log(`${err.name}, ${err.message} occurred.`)
            console.log("server couldnot start❌")
        }
        else{
            console.log(`Server started successfully on port ${getEnvProperty("port")}.✅`)
        }
    })
    return app
   }
   catch(err){
    console.log(err.message)
   }
}