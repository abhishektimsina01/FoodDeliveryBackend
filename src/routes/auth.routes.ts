import { Router } from "express";
import { CustomerLogIn, CustomerSignUp, LogOut, ResturantLogIn, ResturantSignUp } from "../controller/auth.controller";

export const authRouter = Router()

authRouter.post("/auth/user/login")
authRouter.post("/auth/user/logut")
authRouter.post("/auth/CustomerSignup", CustomerSignUp)
authRouter.post("/auth/CustomerLogIn", CustomerLogIn)
authRouter.post("/auth/ResturantSignUp", ResturantSignUp)
authRouter.post("/auth/ResturantLogIn", ResturantLogIn)
authRouter.get('/auth/logout', LogOut)