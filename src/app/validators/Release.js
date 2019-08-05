const Joi = require('joi')

module.exports = {
  body: {
    provider: Joi.string(),

    dt_release: Joi.required(),
    
    quantity: Joi.number(),
     
  }
}