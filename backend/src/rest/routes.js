import { Router } from 'express';

import * as controller from './controllers.js';

const router = Router();

/* index */

router.get('/', controller.index);

export default router;
