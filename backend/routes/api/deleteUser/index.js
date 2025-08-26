const deleteController = require('../../../controllers/delete.controller');

const router = require('express').Router();

router.delete('/:id', deleteController);

module.exports = router;
