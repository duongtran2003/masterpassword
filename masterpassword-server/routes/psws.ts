let express = require('express');
let router = express.Router();
let pswsController = require('../controllers/pswsController');
router.get('/index', pswsController.index);
router.post('/create', pswsController.create);
router.put('/update', pswsController.edit);
router.delete('/delete', pswsController.delete);
module.exports = router;