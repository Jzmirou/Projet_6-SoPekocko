const Joi = require('joi')

const schemasSignup = Joi.object({
    email: Joi.string()
        .required()
        .email(),
    password: Joi.string()
        .min(6)
        .required()
})

module.exports = schemasSignup