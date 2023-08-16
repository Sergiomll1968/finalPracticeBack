import cartModel from './carts.model.js';

export async function getAll(req, res) {
  try {
    const carts = await cartModel.find().lean();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getByUserId({ id }) {
  const cart = await cartModel
    .find({ userId: id })
    .lean();
  return cart;
}

export async function patchById({ id, newProps }) {
  const query = { _id: id };
  const updatedCart = await cartModel.findOneAndUpdate(query, newProps, { new: true })
    .lean();
  return updatedCart;
}

export async function deleteById({ id }) {
  const deletedCart = await cartModel.findByIdAndDelete(id);
  return deletedCart;
}

export async function create({ cartData }) {
  const newCart = await cartModel.create({ cartData });
  return newCart;
}
