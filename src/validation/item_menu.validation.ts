import Joi from "joi";
import { ITEM_TYPE } from "../enums/enums";


export const createMenuSchema = Joi.object({
    item_name: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    item_type: Joi.string()
        .valid(...Object.values(ITEM_TYPE))
        .required(),

    price: Joi.number()
        .positive()
        .required()
});

export const updateMenuSchema = Joi.object({
    item_name: Joi.string()
        .trim()
        .min(2)
        .max(100),

    item_type: Joi.string()
        .valid(...Object.values(ITEM_TYPE)),

    price: Joi.number()
        .positive()
})
    .min(1);