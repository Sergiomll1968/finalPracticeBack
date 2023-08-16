import userModel from './users.model.js';

export async function getAll(req, res) {
  const query = req.query.new;
  try {
    const users = query
      ? await userModel.find().sort({ _id: -1 }).limit(5).lean()
      : await userModel.find().lean();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function getById({ id }) {
  const user = await userModel
    .findById(id)
    .lean();
  const { password, ...others } = user._doc;
  return others;
}

export async function patchById({ id, newProps }) {
  const query = { _id: id };
  const updatedUser = await userModel.findOneAndUpdate(query, newProps, { new: true })
    .lean();
  return updatedUser;
}

export async function deleteById({ id }) {
  const deletedUser = await userModel.findByIdAndDelete(id);
  return deletedUser;
}

export async function getStats(req, res) {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await userModel.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
}

export async function create({
  username, password, email,
}) {
  const newUser = await userModel.create({
    username, password, email,
  });
  return newUser;
}

export async function getByEmail({ email }) {
  const user = await userModel
    .findOne({ email });
  return user;
}

export async function updateByEmail({ email, hashedPassword }) {
  const query = { email };
  const newProps = { password: hashedPassword };
  const updatedUser = await userModel.findOneAndUpdate(query, newProps, { new: true })
    .lean();
  return updatedUser;
}

export async function getByUsername({ username }) {
  const user = await userModel
    .findOne({ username })
    .lean();
  return user;
}

export async function confirm({ username }) {
  const userConfirmed = await userModel.updateOne(
    { username },
    {
      confirmed: true,
    },
  );
  return userConfirmed;
}
