import * as cartsService from './carts.service.js';

export async function getAll(req, res) {
  const carts = await cartsService.getAll(req, res);
  res.json(carts);
}

export async function getByUserId(req, res) {
  const { id } = req.params.userId;
  const cart = await cartsService.getByUserId({ id });
  res.json(cart);
}

export async function patchById(req, res) {
  const { id } = req.params;
  const newProps = req.body;

  const updatedCart = await cartsService.patchById({ id, newProps });
  res.json(updatedCart);
}

export async function deleteById(req, res) {
  const { id } = req.params;
  const deletedCart = await cartsService.deleteById({ id });
  res.json(deletedCart);
}

export async function create(req, res) {
  const cartData = req.body;
  const newCart = await cartsService.create({ cartData });
  res.json(newCart);
}
