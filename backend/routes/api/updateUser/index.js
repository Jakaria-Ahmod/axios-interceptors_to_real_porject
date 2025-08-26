const updateUserController = require('../../../controllers/updateUser.controller');

const router = require('express').Router();

router.put('/:id', updateUserController);

module.exports = router;
