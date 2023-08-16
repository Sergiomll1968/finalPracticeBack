import * as ordersRepo from './orders.repository.js';

export async function getAll(req, res) {
  const orders = await ordersRepo.getAll(req, res);
  return orders;
}

export async function getByUserId({ id }) {
  const order = await ordersRepo.getByUserId({ id });
  return order;
}

export async function patchById({ id, newProps }) {
  const updatedOrder = await ordersRepo.patchById({ id, newProps });
  return updatedOrder;
}

export async function deleteById({ id }) {
  const deletedOrder = await ordersRepo.deleteById({ id });
  return deletedOrder;
}

export async function create({ orderData }) {
  const newOrder = await ordersRepo.create({ orderData });
  return newOrder;
}

export async function getIncome(req, res) {
  const data = await ordersRepo.getIncome(req, res);
  return data;
}
