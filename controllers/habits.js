const express = require('express');
const router = express.Router();
const User = require('../models/user.js');


//displays habits on home page
//the below forward slash represents /users/userId/habits
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('habits/index.ejs', {
        habits: currentUser.habits,
    });
    } catch {
        console.log(error);
        res.redirect('/');
    }
});

//seeing your list habits once you're logged in, then add view in newAM.ejs
router.get('/newAM', async (req, res) => {
    res.render('habits/newAM.ejs');
});

router.get('/newPM', async (req, res) => {
    res.render('habits/newPM.ejs');
});


//route for adding new habits in general
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
  });

router.get('/:habitId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const habit = currentUser.habits.id(req.params.habitId);
        res.render('habits/show.ejs', {
            habit
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

//edit route

router.get('/:habitId/edit', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      const habit = currentUser.habits.id(req.params.habitId);
      res.render('habits/edit.ejs', {
        habit : habit,
      });
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });
  
  //showing updated edited habits
  router.put('/:habitId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const habit = currentUser.habits.id(req.params.habitId);
        habit.set(req.body);
        await currentUser.save();
        res.redirect(
            `/users/${currentUser._id}/habits/${req.params.habitId}`
        );
    } catch (error) {
        console.log(error)
        res.redirect('/');
    }
  });

//delete route
router.delete('/:habitId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.session.user._id);
      currentUser.habits.id(req.params.habitId).deleteOne();
      await currentUser.save();
      res.redirect(`/users/${currentUser._id}/habits`);
    } catch (error) {
      console.log(error);
      res.redirect('/');
    }
  });


module.exports = router;