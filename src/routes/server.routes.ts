// we register all the routes here
import { Application } from "express";
import { errorHandler, notFound } from "../middleware/error.handler.middleware";
import { authRouter } from "./auth.routes";
import { userRouter } from "./user.route";
import { deliveryRouter } from "./delivery.route";
import { menuRouter } from "./menu.route";
import { orderRouter } from "./order.route"
import { resturantRouter } from "./resturant.route";
import { transactionRouter } from "./trasnsaction.route";

export const serverRoute = (app : Application) => {
    app.use("/api/v1", [
        authRouter,
        userRouter,
        deliveryRouter,
        menuRouter,
        orderRouter,
        resturantRouter,
        transactionRouter
    ])

    // error handler middleware
    app.use(notFound)
    app.use(errorHandler)
    console.log("Server routes registered✅")
}