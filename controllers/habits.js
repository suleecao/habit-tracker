const express = require('express');
const User = require('../models/user');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        res.render('habits/index.ejs');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;