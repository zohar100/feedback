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
        const token = jwt.sign({id: savedUser._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        const user = await User.findById(savedUser._id).populate({
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
        }).populate({
            path: 'favorites',
            model: 'Post'
        }).populate({
            path: 'followers',
            model: 'User'
        }).populate({
            path: 'following',
            model: 'User'
        })

        res.json({
            token: token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                posts: user.posts,
                favorites: user.favorites,
                following: user.following,
                followers: user.followers
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

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        const newUser = await User.findById(user._id).populate({
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
        }).populate({
            path: 'favorites',
            model: 'Post'
        }).populate({
            path: 'followers',
            model: 'User'
        }).populate({
            path: 'following',
            model: 'User'
        })

        res.json({
            token: token,
            user: {
                id: newUser._id,
                email: newUser.email,
                username: newUser.username,
                posts: newUser.posts,
                favorites: newUser.favorites,
                following: newUser.following,
                followers: newUser.followers
            }
         });
        req.user = user;
    }catch(err){
        return res.status(500).json({ error: err.message });
    }
});

//get spacific user
router.get('/user/:id', isLoggedIn, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({
            path: 'posts', //populate posts in user
            model: 'Post',
            populate: [{
                path: 'comments', //populate comments in post 
                model: 'Comment', 
                populate:{
                    path: 'author', //populate author in comment
                    model: 'User'
                }
            },
            {
                path: 'author',//populate author in post
                model: 'User'
            },],
        }).populate({
            path: 'favorites',//populate favorites in user
            model: 'Post'
        })
        .populate({
            path: 'followers',
            model: 'User'
        }).populate({
            path: 'following',
            model: 'User'
        })
                
        res.json(user)
    }catch(err) {
        return res.status(400).json({ msg: 'User not exist.' })
    }
 
})

//get all users
router.get('/allusers', isLoggedIn, async (req, res) => {
    const users = await User.find({});

    res.json(users);
})

//delete spacific user
router.delete('/delete', isLoggedIn, async (req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.user)
        return res.json(deletedUser)
    }catch(err){
        return res.status(500).json({ error: err.massege });
    }
});

//folow and unfolow
router.post('/follow/:userId', isLoggedIn, async (req, res) => {
    try {
        const userToFolow = await User.findById(req.params.userId);
        const currentUser = await User.findById(req.user);
    
        //check if the current user already follow this userToFolow
        const userFollow = await currentUser.following.find(user => user.equals(req.params.userId));
        
        //if the user already follow
        if(userFollow) {
            //pull out the userId from current user folowing
            currentUser.following.pull(req.params.userId)
            //pull out the userId from user folowers
            userToFolow.followers.pull(req.user)
            console.log(currentUser);
            console.log(userToFolow);
        }else {
            //push the userId to current user folowing
            currentUser.following.push(req.params.userId)
            //push the userId to user folowers
            userToFolow.followers.push(req.user)
            console.log(currentUser);
            console.log(userToFolow);
        }
    
        await userToFolow.save()
        await currentUser.save()
        return res.json({user: userToFolow, currentUser: currentUser});
    }catch (err){
        return res.status(500).json({ error: err.massege });
    }
})

router.post('/tokenIsValid', async (req,res) => {
    try {   
        const token = req.header("x-auth-token");
        if(!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        if(!verified) return res.json(false);

        const user = await User.findOne({_id: verified.id})
        if(!user) return res.json(false);

        const sendUser = await User.findById(user._id).populate({
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
        }).populate({
            path: 'favorites',
            model: 'Post'
        }).populate({
            path: 'followers',
            model: 'User'
        }).populate({
            path: 'following',
            model: 'User'
        })


        return res.json({user: {
                    id: sendUser._id,
                    email: sendUser.email,
                    username: sendUser.username,
                    posts: sendUser.posts,
                    favorites: sendUser.favorites,
                    following: sendUser.following,
                    followers: sendUser.followers
                    }, token: token});
    }catch(err){
        return res.status(500).json({ error: err.message });
    }
});


module.exports = router;