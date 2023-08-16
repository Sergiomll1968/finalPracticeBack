import orderModel from './orders.model.js';

export async function getAll(req, res) {
  try {
    const orders = await orderModel.find().lean();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getByUserId({ id }) {
  const order = await orderModel
    .find({ userId: id })
    .lean();
  return order;
}

export async function patchById({ id, newProps }) {
  const query = { _id: id };
  const updatedOrder = await orderModel.findOneAndUpdate(query, newProps, { new: true })
    .lean();
  return updatedOrder;
}

export async function deleteById({ id }) {
  const deletedOrder = await orderModel.findByIdAndDelete(id);
  return deletedOrder;
}

export async function create({ orderData }) {
  const newOrder = await orderModel.create({ orderData });
  return newOrder;
}

export async function getIncome(req, res) {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await orderModel.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
}
