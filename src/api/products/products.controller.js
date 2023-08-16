import * as productsService from './products.service.js';

export async function getAll(req, res) {
  const products = await productsService.getAll(req, res);
  res.json(products);
}

export async function getById(req, res) {
  const { id } = req.params;
  const product = await productsService.getById({ id });
  res.json(product);
}

export async function patchById(req, res) {
  const { id } = req.params;
  const newProps = req.body;

  const updatedProduct = await productsService.patchById({ id, newProps });
  res.json(updatedProduct);
}

export async function deleteById(req, res) {
  const { id } = req.params;
  const deletedUser = await productsService.deleteById({ id });
  res.json(deletedUser);
}

export async function create(req, res) {
  const productData = req.body;
  const newProduct = await productsService.create({ productData });
  res.json(newProduct);
}
