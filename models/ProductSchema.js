import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  StockQty: {
    type: Number,
    required: true,
  },
});

export const ProductModel = mongoose.model("ProductModel", ProductSchema);
