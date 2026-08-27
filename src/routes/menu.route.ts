import { Router } from "express";
import { authenticationMiddleware } from "../middleware/auth.middleware";
import { createItem, getItem, getItems } from "../controller/menu.controller";

export const menuRouter = Router()

menuRouter.get("/menu", authenticationMiddleware, getItems)
menuRouter.post("/item", authenticationMiddleware, createItem)
menuRouter.get("/item/:id", authenticationMiddleware as any, getItem)