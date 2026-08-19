// we register all the server-middleware in our application

import { Application } from "express";
import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import { limiter } from "../config/rate.limiter";


export const serverMiddleware = (app: Application) => {
    app.use(cookieParser());

    app.use(express.json());

    app.use(express.urlencoded({ extended: true }));

    app.use(morgan("dev"));

    app.use(limiter);
};