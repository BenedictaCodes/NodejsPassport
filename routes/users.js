const express = require('express');
const router = express.Router();
const User = require('../model/User');
const passport = require('passport');
const bcrypt = require('bcryptjs');


router.get('/login', (req, res) => res.render('login'))
router.get('/register', (req, res) => res.render('register'))


router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body
    console.log(req.body)
    let errors = []
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' })
    }
    if (password !== password2) {
        errors.push({ msg: 'Passwords do not match' })
    }
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' })
    }
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
        console.log(errors);
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ mgs: 'Email already exists' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                    console.log(errors);
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    // Hash password
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Set password to hashed
                        newUser.password = hash,
                            // Save User
                            newUser.save()
                                .then(user => {

                                    res.redirect('/Users/login')
                                })
                                .catch(err => console.log(err));
                    }));
                };
            });
    };
});


//Login Route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

//Logout Route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    })
    req.flash('You are logged out');
    res.redirect('/users/login');
})




//Assignment
router.post('/login', (req, res) => {
    const { name, email, password, } = req.body
    console.log(req.body)
    if (email === password) {
        console.log('love')
    }
})


// let errors = []
// if (!name || !email || !password || !password2) {
//     errors.push({ msg: 'Please fill in all fields' })
// }
// if (password !== password2) {
//     errors.push({ msg: 'Passwords do not match' })
// }
// if (password.length < 6) {
//     errors.push({ msg: 'Password must be at least 6 characters' })
// }
// if (errors.length > 0) {
//     res.render('register', {
//         errors,
//         name,
//         email,
//         password,
//         password2
//     });
//     console.log(errors);
// } else {
//     res.send('welcome');
// }





module.exports = router