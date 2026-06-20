//src/models/userModel.js

import { Schema, model } from 'mongoose';
import mongoose from "mongoose";

//* Створюємо схему користувача
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

//* Перевизначити toJSON() у моделі
userSchema.methods.toJSON = function () {
  const obj = this.toObject(); // створення точної копії
  delete obj.password; // видаляється властивість password
  return obj; // повертається копія на клієнта
};

//* Створюємо модель користувача
export const User = model('User', userSchema);
