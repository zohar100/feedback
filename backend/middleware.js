module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        res.json('You must be logged in')
    }else{
        next();
    }
}