import Router from 'express';
import * as cartsController from './carts.controller.js';
import * as accessControl from '../../middlewares/accessControl.middleware.js';

const router = Router();

router.get('/all', accessControl.verifyTokenAndAdmin, cartsController.getAll);
router.get('/:userId', accessControl.verifyTokenAndAuthorization, cartsController.getByUserId);

router.patch('/:id', accessControl.verifyTokenAndAuthorization, cartsController.patchById);

router.delete('/:id', accessControl.verifyTokenAndAuthorization, cartsController.deleteById);

router.post('/', accessControl.verifyToken, cartsController.create);

export default router;
