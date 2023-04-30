const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');

const welcome_page = (req, res) => {
    res.render('welcome', { title: 'DOW | Welcome' });
};

const sign_up = (req, res) => {
    res.render('signup');
};

const log_in = (req, res) => {
    res.render('login');
};

const home_page = (req, res) => {
    res.render('home');
};

const signup_register = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Checking required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please Fill in all fields' });
    }

    // Checking passwords match
    if (password !== password2) {
        errors.push({ msg: 'Password do not match' });
    }

    // Checking password length
    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('signup', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        // Validation Passed
        User.findOne({ email: email })
            .then((user) => {
                if(user) {
                    // User exists
                    errors.push({ msg: 'Already registered email' });
                    res.render('signup', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });

                    // Hash Password 
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err;

                            // Set password to hashed
                            newUser.password = hash;

                            // Save User
                            newUser.save()
                                .then((user) => {
                                    res.redirect('/login');
                                })
                                .catch((err) => {
                                    console.log(err);
                                })
                        })
                    });
                }
            });
    }
};

const login_authenticate = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send("Error");
        } else {
            res.redirect('/login');
            return ({ message: 'Logout Succesfully' });
        }
    })
}

module.exports = {
    welcome_page,
    sign_up,
    log_in,
    home_page,
    signup_register,
    login_authenticate,
    logout
};