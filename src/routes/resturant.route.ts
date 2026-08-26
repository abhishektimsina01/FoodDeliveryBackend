import { Router } from "express";
import { deleteResturant, getResturant, getResturants, updateResturant, updateResturantAdmin } from "../controller/resturants.controller";
import { authenticationMiddleware } from "../middleware/auth.middleware";

export const resturantRouter = Router()

resturantRouter.get("/resturants",authenticationMiddleware, getResturants)
resturantRouter.get("/resturant/:id", authenticationMiddleware as any, getResturant)
resturantRouter.patch("/resturant", authenticationMiddleware as any, updateResturant)
resturantRouter.patch("/resturant/:id", authenticationMiddleware as any, updateResturantAdmin)
resturantRouter.delete("/resturant/:id", authenticationMiddleware as any, deleteResturant)