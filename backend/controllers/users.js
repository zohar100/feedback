const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cloudinary } = require('../cloudinary');
const User = require('../models/user.model');
const Post = require('../models/post.model')
const SerevrError = require('../utility/ServerError');
const catchAsync = require('../utility/catchAsync');


//-----------Register New User-----------//
module.exports.register = catchAsync(async (req, res, next) => {
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
            profileImage: {
                url: req.file.path,
                filename: req.file.filename
            },
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
            },
        ]
        }).populate({
            path: 'favorites',
            model: 'Post',
            populate: [
                {
                path: 'author',
                model: 'User'
                },
                {
                path: 'comments',
                model: 'Comment', 
                populate:
                    {
                    path: 'author',
                    model: 'User'
                    }
                }
            ]
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
                profileImage: user.profileImage,
                posts: user.posts,
                favorites: user.favorites,
                following: user.following,
                followers: user.followers
            }
         });
});

//-----------Login Exist User-----------//
module.exports.login = catchAsync(async (req, res, next) => {
        const {email, password} = req.body;
        //validate
        if(!email || !password)
            throw new SerevrError('Not all fields have been entered.', 401)
            // return res.status(400).json({ msg: 'Not all fields have been entered.' });

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
            populate: [
                {
                path: 'comments',
                model: 'Comment', 
                populate:
                    {
                    path: 'author',
                    model: 'User'
                    }
                },
                {
                path: 'author',
                model: 'User'
                },
            ]
        }).populate({
            path: 'favorites',
            model: 'Post',
            populate: [
                {
                path: 'author',
                model: 'User'
                },
                {
                path: 'comments',
                model: 'Comment', 
                populate:
                    {
                    path: 'author',
                    model: 'User'
                    }
                }
            ]
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
                profileImage: newUser.profileImage,
                posts: newUser.posts,
                favorites: newUser.favorites,
                following: newUser.following,
                followers: newUser.followers
            }
         });
});

//-----------Get All Users / Search By Name-----------//
module.exports.index = async (req, res) => {
    if(req.query.username) {
        console.log(req.query);
        const queryUsers = await User.find({ username: req.query.username });
        console.log(queryUsers);
        return res.json(queryUsers);
    }else{
        const users = await User.find({});
        return res.json(users);
    }
};

//-----------Get Spacific User-----------//
module.exports.showUser = catchAsync(async (req, res) => {
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
                
        res.json({
            user: {
            id: user._id,
            email: user.email,
            username: user.username,
            profileImage: user.profileImage,
            posts: user.posts,
            favorites: user.favorites,
            following: user.following,
            followers: user.followers
        }
    });
});

//-----------Edit User-----------//
module.exports.editUser = catchAsync(async (req, res) => {
    const { username, email, password, newPassword } = req.body;

    if(!username && !email && !newPassword) {
        return res.status(400).json({ msg: 'No make any changes' });
    }

    const user = await User.findById(req.params.id);
    const passwordIsMatch = await bcrypt.compare(password, user.password);
    if(!passwordIsMatch){
        return res.status(400).json({ msg: 'Invalid password.' });
    }
    if(newPassword) {
            if(password.length < 5 || newPassword.length < 5){
                return res.status(400).json({ msg: 'The password needs to be at leat 6 characters long.' });
            }
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(newPassword, salt);
            user.password = passwordHash;
    }
    if(req.file) {
        if(user.profileImage.filename){
            await cloudinary.uploader.destroy(user.profileImage.filename);
        }
        user.profileImage = {
            url: req.file.path,
            filename: req.file.filename
        }
    }

    if(username) {
        user.username = username;
    }
    if(email) {
        user.email = email;
    }

    console.log(user);
    await user.save();
    return res.json({msg: 'User updated successfuly!', user: user});
});

//-----------Delete User-----------//
module.exports.deleteUser = catchAsync(async (req, res) => {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        return res.json(deletedUser)
});

//-----------Follow User / Unfollow User-----------//
module.exports.followUser = catchAsync(async (req, res) => {
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
});

//-----------Add To User's Favorites / Remove From User's Favorites-----------//
module.exports.toggleFavorite = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.userId);
    const postInFav = await user.favorites.find(post => post.equals(req.body.postId))

    if(postInFav) {
        user.favorites.pull(req.body.postId)
    }else {
        user.favorites.push(req.body.postId)
    }

    await user.save();

    const post = await Post.findById(req.body.postId)
            .populate('author')
            .populate({
                path: "comments", // populate comments
                populate: {
                path: "author" // in comments, populate author
                }
            });
    
    res.json(post);
  });

//-----------Check Token Validation-----------//
module.exports.tokenValidation = catchAsync(async (req,res) => {
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
        model: 'Post',
        populate: [
            {
            path: 'author',
            model: 'User'
            },
            {
            path: 'comments',
            model: 'Comment', 
            populate:
                {
                path: 'author',
                model: 'User'
                }
            }
        ]
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
                profileImage: sendUser.profileImage,
                posts: sendUser.posts,
                favorites: sendUser.favorites,
                following: sendUser.following,
                followers: sendUser.followers
                }, token: token});
});