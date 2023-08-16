import * as cartsRepo from './carts.repository.js';

export async function getAll(req, res) {
  const carts = await cartsRepo.getAll(req, res);
  return carts;
}

export async function getByUserId({ id }) {
  const cart = await cartsRepo.getByUserId({ id });
  return cart;
}

export async function patchById({ id, newProps }) {
  const updatedCart = await cartsRepo.patchById({ id, newProps });
  return updatedCart;
}

export async function deleteById({ id }) {
  const deletedCart = await cartsRepo.deleteById({ id });
  return deletedCart;
}

export async function create({ cartData }) {
  const newCart = await cartsRepo.create({ cartData });
  return newCart;
}
