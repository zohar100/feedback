module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAthenticated()){
        res.json({error: 'You must be logged in'})
      }else{
          next();
      }
    
}