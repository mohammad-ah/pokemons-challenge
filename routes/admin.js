var express = require('express');
var router = express.Router();
const adminController = require('../controller/admin');
const authenticateJWT = require('../middlewares/authenticateJWT');
const generateToken = require('../middlewares/generateToken')

/* init DB */
router.post('/init', authenticateJWT, adminController.initDb);

/* get by id */
router.get('/:id', adminController.getById);

/* toggle favorite by id. */
router.post('/:id/favorite', authenticateJWT, adminController.toggleFavorite);

/* this will handle search by name. */
router.get('/name/:name', adminController.getByName);

/* search query by page, limit, name and filter by. */
/* this will handle search by types list. */
router.get('/types/:types', adminController.getByTypes);

/* this will handle search by name and types list. */
router.get('/', async function(req, res, next) {
    await adminController.generalQuery(req, res, next);
});

/* Basically to get a token. */
router.post('/login', generateToken);

module.exports = router;
