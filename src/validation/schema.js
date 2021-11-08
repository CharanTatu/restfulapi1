const Joi = require('@hapi/joi')
const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  phone: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
  name: Joi.string().required(),
  address: Joi.string().required(),
  pincode:Joi.string()
})
async function validation(req, res, next) {
  try {
    await authSchema.validateAsync(req.body);
    next()
  }
  catch (e) {
    console.log(e);
    res.status(400).send({ status: false, error: e.details[0].message })
  }
};
module.exports = validation;
