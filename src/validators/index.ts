import { Schema } from "express-validator";
import { ObjectId } from "mongodb";
import User from "../models/user.model";

export const loginReqValidatorSchema: Schema = {
  login: {
    exists: true,
    trim: true,
    errorMessage: "Login is required",
  },
  password: {
    exists: true,
    trim: true,
    errorMessage: "Password is required",
  },
};

export const registerReqValidatorSchema: Schema = {
  email: {
    exists: true,
    trim: true,
    errorMessage: "E-mail is required",
    custom: {
      options: async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      },
    },
    isEmail: {
      bail: true,
    },
  },
  login: {
    exists: true,
    trim: true,
    errorMessage: "Login is required",
    custom: {
      options: async (login) => {
        const user = await User.findOne({ login });
        if (user) {
          return Promise.reject("Login already in use");
        }
      },
    },
  },
  password: {
    exists: true,
    trim: true,
    errorMessage: "Password is required",
    isLength: {
      options: {
        min: 6,
      },
      errorMessage: "Password should be at least 6 chars long",
    },
  },
};

export const deletePhotosReqValidatorSchema: Schema = {
  photoIds: {
    in: ["params"],
    custom: {
      errorMessage: "Invalid ObjectID",
      options: (val) => {
        const ids = val.split(",");
        return ids.every((id: string) => ObjectId.isValid(id.trim()));
      },
    },
    customSanitizer: {
      options: (val) => {
        return val.split(",").map((id: string) => id.trim());
      },
    },
  },
};

export const deleteAlbumReqValidatorSchema: Schema = {
  albumIds: {
    in: ["params"],
    custom: {
      errorMessage: "Invalid albumIds",
      options: (val) => {
        return /^[0-9]+(,[0-9]+)*$/.test(val);
      },
    },
    customSanitizer: {
      options: (val) => {
        return val.split(",").map((id: number) => +id);
      },
    },
  },
};

export const updateAlbumTitleReqValidatorSchema: Schema = {
  albumId: {
    in: ["params"],
    trim: true,
    isNumeric: {
      errorMessage: "Album id must me numeric",
    },
  },
  title: {
    exists: true,
    trim: true,
    errorMessage: "Title is required",
  },
};
