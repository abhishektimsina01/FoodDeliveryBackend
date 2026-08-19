import { NextFunction, Request, Response } from "express";

// not found api
export const notFound = (req : Request, res : Response, next : NextFunction) => {
    // pass it to the errorHanlder after making the error
}

// error passed to it
export const errorHandler = (err : any ,req: Request, res : Response, next : NextFunction) => {
    // respond the error to the frontend
}