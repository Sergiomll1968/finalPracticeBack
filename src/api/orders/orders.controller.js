import * as ordersService from './orders.service.js';

export async function getAll(req, res) {
  const orders = await ordersService.getAll(req, res);
  res.json(orders);
}

export async function getByUserId(req, res) {
  const { id } = req.params.userId;
  const order = await ordersService.getByUserId({ id });
  res.json(order);
}

export async function patchById(req, res) {
  const { id } = req.params;
  const newProps = req.body;

  const updatedOrder = await ordersService.patchById({ id, newProps });
  res.json(updatedOrder);
}

export async function deleteById(req, res) {
  const { id } = req.params;
  const deletedOrder = await ordersService.deleteById({ id });
  res.json(deletedOrder);
}

export async function create(req, res) {
  const orderData = req.body;
  const newOrder = await ordersService.create({ orderData });
  res.json(newOrder);
}

export async function getIncome(req, res) {
  const data = await ordersService.getIncome(req, res);
  res.json(data);
}
