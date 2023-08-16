import { hashSync } from 'bcrypt';
import * as userService from './users.service.js';

export async function getAll(req, res) {
  const users = await userService.getAll(req, res);
  res.json(users);
}

export async function getById(req, res) {
  const { id } = req.params;
  const userById = await userService.getById({ id });
  res.json(userById);
}

export async function patchById(req, res) {
  const { id } = req.params;
  const newProps = req.body;

  if (newProps.password) {
    newProps.password = hashSync(newProps.password, 10);
  }

  const updatedUser = await userService.patchById({ id, newProps });
  res.json(updatedUser);
}

export async function deleteById(req, res) {
  const { id } = req.params;
  const deletedUser = await userService.deleteById({ id });
  res.json(deletedUser);
}

export async function getStats(req, res) {
  const data = await userService.getStats(req, res);
  res.json(data);
}

export async function changePasswordRequest(req, res) {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    res.json({ message: 'Empty email' });
    return;
  }

  try {
    await userService.changePasswordRequest({ email });
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }
  res.status(200);
  res.json(`Email sent to ${email}`);
}

export async function changePassword(req, res) {
  const { token } = req.params;
  const { password, repeatedPassword } = req.body;

  if (!token || !password || !repeatedPassword) {
    res.status(405);
    res.json({ message: 'Authentication failed' });
    return;
  }

  if (password !== repeatedPassword) {
    res.status(405);
    res.json({ message: 'Authentication failed' });
    return;
  }

  let email;
  try {
    email = await userService.changePassword({ token });
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }

  let updatedUser;
  try {
    updatedUser = await userService.updateByEmail({ email, password });
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }
  res.json(updatedUser);
}

export async function getUsernameByToken(req, res) {
  const user = { ...req.user };
  delete user.password;
  res.json(user);
}
