// we register all the routes here
import { Application, Request, Response } from "express";
import express from "express"
import { errorHandler, notFound } from "../middleware/error.handler.middleware";
import { authRouter } from "./auth.routes";
import { userRouter } from "./user.route";
import { deliveryRouter } from "./delivery.route";
import { menuRouter } from "./menu.route";
import { orderRouter } from "./order.route"
import { resturantRouter } from "./resturant.route";
import { transactionRouter } from "./trasnsaction.route";
import { webhookRouter } from "./webhook.routes";

export const serverRoute = (app : Application) => {
    app.get("/", (req : Request, res : Response) => {
        res.json({
            message : "hello welcome to food delivery"
        })
    })
    app.use("/api/v1/webhook", webhookRouter)
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
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