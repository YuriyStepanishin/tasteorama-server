//src/models/userModel.js

import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      maxlength: 128,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: 'recipes',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
