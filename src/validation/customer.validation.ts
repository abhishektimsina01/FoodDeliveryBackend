import Joi from "joi"


export const addressSchema = Joi.object({
    street_name : Joi.string().required(),
    city : Joi.string().required(),
    ward_num : Joi.number().positive().required(),
    phone_number1: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({ 'string.pattern.base': 'Phone number must be exactly 10 digits.' })
    .required(),
})


export const customerSignUpSchema = Joi.object({
    
    username : Joi.string().required(),
    password : Joi.string().min(8).max(16).required(),
    email : Joi.string().email().required(),
    address : addressSchema.optional(),

})

export const customerLogInSchem = Joi.object({

    email : Joi.string().email().required(),
    password : Joi.string().required().min(8).max(16)

})