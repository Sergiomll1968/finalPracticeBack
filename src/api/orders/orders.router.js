import Router from 'express';
import * as ordersController from './orders.controller.js';
import * as accessControl from '../../middlewares/accessControl.middleware.js';

const router = Router();

router.get('/all', accessControl.verifyTokenAndAdmin, ordersController.getAll);
router.get('/:userId', accessControl.verifyTokenAndAuthorization, ordersController.getByUserId);

router.patch('/:id', accessControl.verifyTokenAndAdmin, ordersController.patchById);

router.delete('/:id', accessControl.verifyTokenAndAdmin, ordersController.deleteById);

router.post('/', accessControl.verifyToken, ordersController.create);

router.get('/income', accessControl.verifyTokenAndAdmin, ordersController.getIncome);

export default router;
