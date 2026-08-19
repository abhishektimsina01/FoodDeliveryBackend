// we register all the routes here
import { Application } from "express";
import { errorHandler, notFound } from "../middleware/error.handler.middleware";

export const serverRoute = (app : Application) => {
    app.use("/api/v1", [notFound])

    // error handler middleware
    app.use(notFound)
    app.use(errorHandler)
    console.log("Server routes registered✅")
}