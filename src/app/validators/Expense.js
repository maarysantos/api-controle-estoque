const Joi = require('joi')

module.exports = {
  body: {
    description: Joi.string().max(5).min(150).required(),

    dt_payment: Joi.date().required(),

    dt_buying: Joi.date().required(),

    price: Joi.number().required(),

    payment_method: Joi.string().required(),

    type: Joi.string().required()

  }
}