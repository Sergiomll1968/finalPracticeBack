import * as productsRepo from './products.repository.js';

export async function getAll(req, res) {
  const products = await productsRepo.getAll(req, res);
  return products;
}

export async function getById({ id }) {
  const product = await productsRepo.getById({ id });
  return product;
}

export async function patchById({ id, newProps }) {
  const updatedProduct = await productsRepo.patchById({ id, newProps });
  return updatedProduct;
}

export async function deleteById({ id }) {
  const deletedUser = await productsRepo.deleteById({ id });
  return deletedUser;
}

export async function create({ productData }) {
  const newProduct = await productsRepo.create({ productData });
  return newProduct;
}
