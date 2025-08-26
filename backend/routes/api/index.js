const router = require('express').Router();

const userCreate = require('./userCreate');
const refresh = require('./refrash');
const verifyToken = require('../../middleware/comonM');
const getAlluser = require('./GetAllUser');
const getSingleuser = require('./singleUser');
const getUpdateuser = require('./updateUser');
const getDeleteuser = require('./deleteUser');

router.use('/refresh', refresh);
router.use('/create-user', verifyToken, userCreate);
router.use('/getAlluser', verifyToken, getAlluser);
router.use('/getSingleuser', verifyToken, getSingleuser);
router.use('/getUpdateuser', verifyToken, getUpdateuser);
router.use('/getDeleteuser', verifyToken, getDeleteuser);

module.exports = router;
