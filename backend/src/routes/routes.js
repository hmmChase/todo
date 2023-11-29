var { Router } = require('express');

// import * as controller from './controller.js';
var { index } = require('./controller.js');

const router = Router();

/* index */

router.get('/', index);

// export default router;
module.exports = router;
