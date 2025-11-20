const express = require('express');
const {postUsers, viewAll, allUsers} = require('../controllers/controller');
const router = express.Router();

router.post('/post', postUsers);
router.get('/range', viewAll);
router.get('/users', allUsers);

module.exports = router;