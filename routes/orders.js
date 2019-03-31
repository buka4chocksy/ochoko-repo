var express = require('express');
var router = express.Router();

var orderControllers = require('../controllers/orderControllers');

router.post('/order',orderControllers.orderProduct);
router.get('/:id', orderControllers.deleteOrder);
router.get('/', orderControllers.viewOrder);

module.exports = router;