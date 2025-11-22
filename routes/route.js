const express = require('express');
const {postUsers, viewAll, allUsers, fieldUsers} = require('../controllers/controller');
const router = express.Router();

router.post('/post', postUsers);
router.get('/range', viewAll);
router.get('/users', allUsers);
router.get('/fieldsusers', fieldUsers);

module.exports = router;