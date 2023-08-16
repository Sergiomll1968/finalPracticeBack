import Router from 'express';

import cartsRouter from './carts/carts.router.js';
import ordersRouter from './orders/orders.router.js';
import productsRouter from './products/products.router.js';
import usersRouter from './users/users.router.js';

import * as authController from './auth/auth.controller.js';

import paymentsRouter from './payments/payments.router.js';

const router = Router();

router.use('/carts', cartsRouter);
router.use('/orders', ordersRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/confirm/:emailtoken', authController.confirm);

router.use('/payments', paymentsRouter);

export default router;
