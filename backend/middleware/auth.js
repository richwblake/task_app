const authenticate = (req, res, next) => {
    if (!req.session.user_id) {
        res.status(401).json({ message: 'Expired session, please re-authenticate' });
    } 
    else
        next();
};


module.exports = {
    authenticate
};
