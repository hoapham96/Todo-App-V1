const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const todoRoutes = require('./todoRoutes.js');

const api_prefix = '/api/v1'
router.use(api_prefix, userRoutes);
router.use(api_prefix, todoRoutes);

module.exports = router;