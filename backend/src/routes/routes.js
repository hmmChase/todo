import { Router } from 'express';

import * as controller from './controller.js';

const router = Router();

/* index */

router.get('/', controller.index);

export default router;
