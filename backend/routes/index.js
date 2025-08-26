const router = require('express').Router();

const api = require('./api');

router.use(process.env.API_VERSION, api);

module.exports = router;
