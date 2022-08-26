const router = require('express').Router();
const apiRoutes = require('./api');

router.get('/', (req, res) => {
    res.send('hello')
})

router.use('/api/v1', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;