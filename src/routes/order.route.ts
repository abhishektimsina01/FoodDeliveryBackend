import { Router } from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import { createOrder, deleteOrders, getOrder, getOrders } from "../controller/order.controller";

export const orderRouter = Router()

orderRouter.post("/order", authenticationMiddleware, createOrder)
orderRouter.get("/order/:id", authenticationMiddleware as any, getOrder)
orderRouter.get("/orders", authenticationMiddleware, getOrders)
orderRouter.delete("/orders", authenticationMiddleware, deleteOrders)