const Joi = require("@hapi/joi");

const userRegistrationValidation = (data) => {
    const schema = Joi.object({
      empNumber: Joi.string().required().label("EmpNumber"),
      firstName: Joi.string().required().label("firstName"),
      lastName: Joi.string().required().label("lastName"),
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().required().label("Password").min(6),
      position: Joi.string().required().label("position"),
      mobile: Joi.string().required().label("mobile"),
      username: Joi.string().required().label("username"),
      supervisorName: Joi.string().required().label("supervisorName"),
      NICNumber: Joi.string().required().label("NICNumber"), 
      department: Joi.string().required().label("department"),
      confirmPassword: Joi.string().required().label("Confirm Password"),
});
return schema.validate(data);
};

const loginValidate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().min(6).required(),
  }); 
  return schema.validate(data);
};

module.exports.userRegistrationValidation = userRegistrationValidation;
module.exports.loginValidate = loginValidate;
