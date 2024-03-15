import mongoose from "mongoose";
//object for roles.
import roles from "../utils/roleObject.js";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(roles), //selection from roles object we created
    required: true,
  },
  purchasedProd: [
    {
      prodId: {
        type: Schema.Types.ObjectId,
        ref: "ProductSchema",
      },
    },
  ],
});

export const UserModel = mongoose.model("UserModel", UserSchema);
