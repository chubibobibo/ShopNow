import mongoose from "mongoose";

const { Schema } = mongoose;

const CartSchema = new Schema({
  prodName: {
    type: String,
    required: true,
  },
  prodQty: {
    type: Number,
    required: true,
  },
});

export const CartModel = mongoose.model("CartModel", CartSchema);
