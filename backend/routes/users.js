const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.model");

//register new user
router.post("/register", (req, res) => {
    const {username, email, password} = req.body;
    const user = new User({username, email});
    User.register(user, password)
        .then(() => {
            User.create(user)
                .then(() => {
                    req.login(user, err => {
                        err ? res.json(err) : res.json({message: 'Welcome', localId: user._id});
                    })
                })
                .catch(err => res.status(400).json(err));
        })
        .catch(err => res.status(400).json(err));
});

//login user
router.post("/login", passport.authenticate('local'),async (req, res) => {
    res.json({message: 'Welcome Back', localId: req.user._id})
    console.log(req.session);
});

//logout user
router.get("/logout", (req, res) => {
    req.logOut()
    res.json({message: 'log you out successfully'})
});

router.get('/isauth', (req, res) => {
    if(req.user) {
        res.json({localId: req.user._id})
    }else{
        res.json({error: 'user no authenticated'})
    }
});

module.exports = router;