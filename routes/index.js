const router = require('express').Router();
const apiRoutes = require('./api');

router.get('/', (req, res) => {
    res.send('OK')
})

router.use('/api/v1', apiRoutes);

module.exports = router;