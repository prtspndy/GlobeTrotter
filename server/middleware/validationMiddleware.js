const validate = (validatorSchema) => (req, res, next) => {
  const { error } = validatorSchema(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failure',
      errors: error.details ? error.details.map(d => d.message) : [error.message]
    });
  }
  next();
};

module.exports = { validate };
