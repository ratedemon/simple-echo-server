const Joi = require('joi');

function DataValidator(req, res, next) {
  const data = req.body;
  const schema = Joi.object().keys({
    time: Joi.date().required(),
    message: Joi.string().required()
  });

  Joi.validate(data, schema, (err) => {
    if(err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    next();
  });
}

module.exports = DataValidator;