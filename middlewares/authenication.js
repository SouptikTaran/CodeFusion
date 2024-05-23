const {validateToken} = require('../Services/authentication')

module.exports.validateTokenCheck = async function (req, res, next) {
    // Get the token from the request headers, query parameters, or cookies
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).render('Login', { isLoggedIn: false });
    }

    try {
        
        const decoded = validateToken(token);
        // Attach the decoded payload to the request object for use in later middleware or route handlers
        req.user = decoded;
        next(); // Proceed to the next middleware
    } catch (error) {
        return res.status(401).render('Login', { isLoggedIn: false });
    }
}
