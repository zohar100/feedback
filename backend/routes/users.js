const router = require("express").Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isLoggedIn = require('../middlewares/middleware');
const User = require("../models/user.model");

router.post('/register', async (req, res) => {
    try{
        const {email, username, password} = req.body;
        
        //validate

        if(!email || !password || !username)
            return res.status(400).json({ msg: 'Not all fields have been entered.' });
        if(password.length < 5)
            return res.status(400).json({ msg: 'The password needs to be at leat 6 characters long.' });
        
        const existingUser = await User.findOne({email: email});
        if(existingUser)
            return res.status(400).json({ msg: 'User with same email are exist.' });

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
  
        const newUser = await new User({
            email: email,
            password: passwordHash,
            username: username
        });
        const savedUser = await newUser.save();

        const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET);

        res.json({
            token: token,
            user: {
                id: savedUser._id,
                email: savedUser.email,
                username: savedUser.username
            }
         });

    }
    catch(err){
        return res.status(500).json({ error: err.massege });
    }

});

router.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;

        //validate
        if(!email || !password)
            return res.status(400).json({ msg: 'Not all fields have been entered.' });

        const user = await User.findOne({email: email});
        if(!user) 
            return res.status(400).json({ msg: 'User not exist.' });

        const passwordIsMatch = await bcrypt.compare(password, user.password);
        if(!passwordIsMatch)
            return res.status(400).json({ msg: 'Invalid email or password.' });

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({
           token: token,
           user: {
               id: user._id,
               email: user.email,
               username: user.username
           }
        });
        req.user = user;
    }catch(err){
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
});

router.get('/user/:id', isLoggedIn, (req, res) => {
    User.findById(req.params.id).populate({
        path: 'posts',
        model: 'Post',
        populate: [{
            path: 'comments',
            model: 'Comment', 
            populate:{
                path: 'author',
                model: 'User'
            }
        },
        {
            path: 'author',
            model: 'User'
        },],
    })
        .then(user => res.json(user))
        .catch(err => res.status(400).json({ msg: 'User not exist.' }))
})

router.delete('/delete', isLoggedIn, async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.user)
        return res.json(deletedUser)
    }catch(err){
        return res.status(500).json({ error: err.massege });
    }
});

router.post('/tokenIsValid', async (req,res) => {
    try {   
        const token = req.header("x-auth-token");
        if(!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) return res.json(false);

        const user = await User.findOne({_id: verified.id})
        if(!user) return res.json(false);

        return res.json(true);
    }catch(err){
        return res.status(500).json({ error: err.message });
    }
});

module.exports = router;