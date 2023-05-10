
const Joi = require('joi');

    const registerSchema = Joi.object ({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    
    }) ;

    const loginSchema = Joi.object({
        email: Joi.string().min(6).email().required(),
        password: Joi.string().min(6).required()
    
    }) ;

module.exports = {registerSchema, loginSchema };
