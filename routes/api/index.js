const router = require('express').Router();
const userRoutes = require('./userRoutes.js');
const todoRoutes = require('./todoRoutes.js');

router.use(userRoutes);
router.use(todoRoutes);

module.exports = router;