const express = require('express');
const router = express.Router();

const User = require('../models/Users');

router.get('/user', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

module.exports = router;