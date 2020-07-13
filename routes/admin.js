var express = require('express');
var router = express.Router();
const adminController = require('../controller/admin');
const authenticateJWT = require('../middlewares/authenticateJWT');
const generateToken = require('../middlewares/generateToken')

/* Get filters. */
// router.param('name', adminController.getFiltered);


/* init DB */
router.post('/init', authenticateJWT, adminController.initDb);

/* get by id */
router.get('/:id', adminController.getById);

/* toggle favorite by id. */
router.post('/:id/favorite', authenticateJWT, adminController.toggleFavorite);

/* search query by page, limit, name and filter by. */
router.get('/search/:page&:limit&:name&:filter_by', authenticateJWT, adminController.search);

/* this will handle search by name and types list. */
router.get('/', async function(req, res, next) {
    await adminController.generalQuery(req, res, next);
});

/* Basically to get a token. */
router.post('/login', generateToken);

module.exports = router;
