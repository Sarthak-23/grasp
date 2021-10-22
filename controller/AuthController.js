const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const saltrounds = 10;

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user._id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (user) {
            done(err, user);
        }
    } catch (err) {
        console.log(err);
    }
});

// Login Strategy
passport.use(
    'login',
    new LocalStrategy(async (req, username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Invalid credentials!' });
            }
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                return done(null, false, { message: 'Invalid credentials!' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);

// Register Strategy
passport.use(
    'register',
    new LocalStrategy(async (req, username, password, done) => {
        try {
            let user = await User.findOne({ username: username });
            if (user) {
                return done(null, false, {
                    message: 'Username already exists',
                });
            }
            const hashed = await bcrypt.hash(password, saltrounds);
            user = User({
                username: username,
                password: hashed,
                name: req.body.name,
            });
            await user.save();
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);
