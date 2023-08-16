import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true },
);

const cartModel = model('Cart', cartSchema);

export default cartModel;
