const Joi = require('joi');

module.exports = {
  body: {
    company: Joi.string().required(),

    trade: Joi.string().required(),

    cnpj: Joi.number().required().min(11).max(14),

    ie: Joi.number().required().min(12).max(12),

    zip_code: Joi.number().min(8).max(8),

    phone1: Joi.number().min(10).max(10),

    phone2: Joi.number().min(10).max(10),

    mail: Joi.string().email(),

    site: Joi.string().uri(),
    
    phone_employee: Joi.number().min(10).max(11)
  }
}