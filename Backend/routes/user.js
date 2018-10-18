const router = require('express').Router();

const userController = require('../controllers/userController');

router.post('/add', userController.add);
router.get('/get/:wechat_id', userController.get);

module.exports = router;