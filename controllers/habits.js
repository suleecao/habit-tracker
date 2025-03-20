//AM habits only TODO: refactor
const express = require('express');
const User = require('../models/user');
const router = express.Router();

//displays habits on home page
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('habits/index.ejs', {
            habits: currentUser.habits,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//TODO split habits into AM and PM
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.habits.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/habits`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
})

//seeing your list habits once you're logged in, then add view in newAM.ejs
router.get('/newAM', async (req, res) => {
    res.render('habits/newAM.ejs');
});

router.get('/newPM', async (req, res) => {
    res.render('habits/newPM.ejs');
});

module.exports = router;