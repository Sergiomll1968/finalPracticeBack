import * as authService from './auth.service.js';
import * as usersRepository from '../users/users.repository.js';

function isValidEmail(mail) {
  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if (validEmail.test(mail)) {
    return true;
  }
  return false;
}

export async function register(req, res) {
  const {
    username, password, email,
  } = req.body;

  let message;

  if (!username || !password || !email) {
    const resobj = { ok: false, message: 'Empty required params' };
    res.json(resobj);
    return;
  }

  if (!isValidEmail(email)) {
    const resobj = { ok: false, message: 'Invalid email' };
    res.json(resobj);
    return;
  }

  const userEmailExists = await usersRepository.getByEmail({ email });

  if (userEmailExists) {
    const resobj = { ok: false, message: 'Email exists' };
    res.json(resobj);
    return;
  }

  const usernameExists = await usersRepository.getByUsername({ username });

  if (usernameExists) {
    const resobj = { ok: false, message: 'Username exists' };
    res.json(resobj);
    return;
  }

  try {
    message = await authService.register({
      username, password, email,
    });
  } catch (err) {
    const myError = JSON.parse(err.message);
    res.status(myError.status);
    res.json(myError.message);
    return;
  }

  res.json(message);
}

export async function login(req, res) {
  const { username, password } = req.body;
  let userDataAndToken;

  if (!username || !password) {
    const resobj = { ok: false, message: 'Empty required params' };
    res.json(resobj);
    return;
  }

  try {
    userDataAndToken = await authService.login({ username, password });
  } catch (err) {
    const myError = JSON.parse(err.message);
    // res.status(myError.status);
    res.json(myError);
    return;
  }
  res.json(userDataAndToken);
}

export async function confirm(req, res) {
  const { emailtoken } = req.params;
  await authService.confirm({ emailtoken });
  res.redirect('https://my-bookings.vercel.app/confirm');
}
