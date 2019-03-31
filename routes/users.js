var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userControllers');

router.post('/signup',userControllers.createUser);
router.post('/login',userControllers.loginUser);

module.exports = router;
