module.exports.isLoggedIn = (req, res, next) => {
    if(!req.session.user){
        res.status(400).json({error: 'You must be logged in'})
        console.log(req.session);
      }else{
          next();
      } 
}