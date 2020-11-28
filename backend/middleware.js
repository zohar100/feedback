module.exports.isLoggedIn = (req, res, next) => {
    if(!req.user){
        res.status(400).json({error: 'You must be logged in'})
      }else{
          next();
      } 
}