const singleUserController = require('../../../controllers/singleUser.controller');

const router = require('express').Router();

router.post('/:id', singleUserController);

module.exports = router;
