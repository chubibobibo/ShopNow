import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    stockQty: {
      type: Number,
      required: true,
    },
    prodDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("ProductModel", ProductSchema);
