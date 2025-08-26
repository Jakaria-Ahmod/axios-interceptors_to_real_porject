const getAlluserController = require('../../../controllers/getAlluser.controller');

const router = require('express').Router();

router.get('/', getAlluserController);

module.exports = router;
