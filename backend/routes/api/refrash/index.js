const refreshController = require('../../../controllers/refrash.controller');

const rotuer = require('express').Router();

rotuer.post('/', refreshController);

module.exports = rotuer;
