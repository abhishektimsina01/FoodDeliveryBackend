import { NextFunction, Request, Response, Router } from "express";
import express from "express"
import { payment } from "../controller/webhooks.controller";


export const webhookRouter = Router()

webhookRouter.post("/payment", express.raw({type : "application/json"}),(req : Request, res : Response, next : NextFunction) => {
    console.log("hook ma event aayo hai")
    next()
}, payment)
webhookRouter.get("/success", (req : Request, res : Response) => {
    res.json({
        "message" : "payment done"
    })
})

webhookRouter.get("/cancel", (req : Request, res : Response) => {
    res.json({
        "error" : "payment canceled"
    })
})