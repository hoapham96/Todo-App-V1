const jwt = require("jsonwebtoken");

const withAuth = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["Authorization"];

    if(!req.user){
        return res.status(401).send({error: 'You must be log in'});
    }

    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    next();
};

module.exports = withAuth;
