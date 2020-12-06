const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try{    
        const token = req.header("x-auth-token");
        if(!token) 
            return res.status(401).json({ msg: 'No authentication token' });
    
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if(!verified)
            return res.status(401).json({ msg: 'Token verfication failed.' });

        req.user = verified.id;
        next();
        }catch(err){
            return res.status(500).json({ error: err.massege });
        }
}

module.exports = isLoggedIn;