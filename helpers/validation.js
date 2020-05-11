// Validation
const Joi = require('@hapi/joi');

const registerValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)
};

const loginValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}

module.exports = {
    registerValidate,
    loginValidate
}