import Joi from "joi";
import { addressSchema } from "./customer.validation";

export const ResturantSignUpSchema = Joi.object({
    email : Joi.string().email().required(),
    resturant_name : Joi.string().min(2).max(40).required(),
    owner_name : Joi.string().min(2).max(40).required(),
    password : Joi.string().min(8).max(16).required(),
    address : addressSchema
})

export const ResturantLogInSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().min(8).max(16).required()
})