const Joi = require('joi');

module.exports = {
  body: {
    id: Joi.string().required(),

    description: Joi.string().required(),

    package: Joi.string().required(),

    stock: Joi.number().required(),

    unit_price: Joi.number().required(),
    
    total_price: Joi.number().required()
  }
}