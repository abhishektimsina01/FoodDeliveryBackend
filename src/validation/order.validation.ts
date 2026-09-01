import Joi from "joi";

export const createOrderSchema = Joi.object({
    resturant_id: Joi.number()
        .integer()
        .positive()
        .required(),

    items: Joi.array().items(Joi.object({
        item_id : Joi.number().min(1).positive().required(),
        quantity : Joi.number().min(1).required()
    })).min(1).required(),
    
    deadline: Joi.date()
        .iso()
        .greater("now")
        .optional()
        .allow(null)
});