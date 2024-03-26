import { body } from "express-validator";
const registerUser = () => {
  return [
    body("name")
      .exists({ checkFalsy: true })
      .withMessage("User name is required")
      .isString()
      .withMessage("User name should be string"),
    body("email")
      .exists()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format"),
    body("password")
      .exists()
      .withMessage("Password is required")
      .isString()
      .withMessage("Password should be string")
      .isLength({ min: 5 })
      .withMessage("Password should be at least 5 characters")
      .isLength({
        max: 20,
      })
      .withMessage("Password can contain max 20 characters")
      .custom((value, { req }) => value === req?.body?.confirmPassword)
      .withMessage("The confirm passwords do not match"),
  ];
};

const authValidation = {
  registerUser,
};

export default authValidation;
