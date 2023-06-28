let express = require('express');
let router = express.Router();
let pswsController = require('../controllers/pswsController');
router.get('/index', pswsController.index);

module.exports = router;