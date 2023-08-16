import Router from 'express';
import * as productsController from './products.controller.js';
import * as accessControl from '../../middlewares/accessControl.middleware.js';

const router = Router();

router.get('/all', productsController.getAll);
router.get('/:id', productsController.getById);

router.patch('/:id', accessControl.verifyTokenAndAdmin, productsController.patchById);

router.delete('/:id', accessControl.verifyTokenAndAdmin, productsController.deleteById);

router.post('/', accessControl.verifyTokenAndAdmin, productsController.create);

export default router;
