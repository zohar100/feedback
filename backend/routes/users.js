const router = require("express").Router();
const isLoggedIn = require('../middlewares/middleware');
const muletr = require('multer');
const { storage } = require('../cloudinary');
const upload = muletr({ storage })
const users = require('../controllers/users');

//add user / register
router.post('/register', upload.single('file'), users.register);

//login user
router.post('/login', users.login);

//check token validation
router.post('/tokenIsValid', users.tokenValidation);

//get all users
router.get('/users', isLoggedIn, users.index);

//get spacific user
router.get('/users/:id', isLoggedIn, users.showUser);

//edit user
router.put('/users/:id', isLoggedIn, upload.single('file'), users.editUser);

//delete spacific user
router.delete('/users/:id', isLoggedIn, users.deleteUser);


//folow and unfolow
router.post('/users/:userId/follow', isLoggedIn, users.followUser);

//user's favorites
// router.get('/users/:userId/favorites', isLoggedIn, users.usersFavorites);

//Toggle post to spacific users favorite
router.post('/users/:userId/favorite', isLoggedIn, users.toggleFavorite);




module.exports = router;