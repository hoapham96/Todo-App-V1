const jwt = require("jsonwebtoken");

const withAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded
    } catch (err) {
        return res.status(401).send(err);
    }

    next()
};

module.exports = withAuth;
