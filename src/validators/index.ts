import { Schema } from "express-validator";

export const loginReqValidatorSchema: Schema = {
  login: {
    errorMessage: "Login is required",
  },
  password: {
    errorMessage: "Password is required",
  },
};

export const registerReqValidatorSchema: Schema = {
  email: {
    isEmail: {
      bail: true,
    },
  },
  login: {
    errorMessage: "Login is required",
  },
  password: {
    errorMessage: "Password should be at least 7 chars long",
  },
};
