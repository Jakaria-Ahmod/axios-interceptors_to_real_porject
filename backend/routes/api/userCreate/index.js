const userCreateController = require('../../../controllers/userCreate.controller');

const router = require('express').Router();

router.post('/', userCreateController);

module.exports = router;
