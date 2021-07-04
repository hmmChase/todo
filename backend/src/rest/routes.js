import { Router } from 'express';
import * as indexController from './controllers/index';

const router = Router();

/* index */

router.get('/', indexController.index);

export default router;
