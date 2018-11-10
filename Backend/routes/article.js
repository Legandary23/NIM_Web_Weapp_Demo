const router = require('express').Router();

const articleController = require('../controllers/articleController');

router.post('/addArticle', articleController.add);
router.get('/getArticle/:article_id', articleController.get);

module.exports = router;