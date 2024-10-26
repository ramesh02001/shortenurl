const User = require('../models/User.js');
const jwt = require('jsonwebtoken');

// Function to get user by ID
async function getuserById(id) {
    return User.findById(id).select("_id username email");
}

// Custom middleware for authorization
const isAuthorized = async (req, res, next) => {
    let token;

    // Check if the token is provided in the headers
    if (req.headers['x-auth-token']) {
        try {
            token = req.headers['x-auth-token']; // Extract token from headers
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
            
            // Get user information based on decoded ID
            req.user = await getuserById(decoded.id);
            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error(error);
            res.status(500).send("Internal server error");
        }
    } else {
        res.status(401).send("Authorization token is required");
    }
};

module.exports = { isAuthorized };
