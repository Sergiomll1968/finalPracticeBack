import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },

  },
  { timestamps: true },
);

const productModel = model('Product', productSchema);

export default productModel;
