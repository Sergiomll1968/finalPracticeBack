import productModel from './products.model.js';

export async function getAll(req, res) {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await productModel.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await productModel.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await productModel.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getById({ id }) {
  const product = await productModel
    .findById(id)
    .lean();
  return product;
}

export async function patchById({ id, newProps }) {
  const query = { _id: id };
  const updatedProduct = await productModel.findOneAndUpdate(query, newProps, { new: true })
    .lean();
  return updatedProduct;
}

export async function deleteById({ id }) {
  const deletedUser = await productModel.findByIdAndDelete(id);
  return deletedUser;
}

export async function create({ productData }) {
  const newProduct = await productModel.create({ productData });
  return newProduct;
}
