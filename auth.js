const jwtSecret = 'your_jwt_secret'; // This has to be the same key used in the JWTStrategy

const jwt = require('jsonwebtoken'), // Import the jsonwebtoken package
    passport = require('passport'); // Import passport

require('./passport'); // Import local passport file

let generateJWTToken = (user) => { // Create a function that generates a JWT
    return jwt.sign(user, jwtSecret, { // Sign the JWT with the user's username and password
        subject: user.Username, // The subject of the JWT is the username
        expiresIn: '7d', // The JWT expires in 7 days
        algorithm: 'HS256' // The algorithm used to sign the JWT
    });
}

// POST login
module.exports = (router) => { // Export the router
    router.post('/login', (req, res) => { // Create a POST route for /login
        passport.authenticate('local', { session: false }, (error, user, info) => { // Authenticate the user
            if (error || !user) { // If there is an error or the user is not found
                return res.status(400).json({ // Return a 400 status code
                    message: 'Something is not right', // Return a message
                    user: user // Return the user
                });
            }
            req.login(user, { session: false }, (error) => { // Log the user in
                if (error) { // If there is an error
                    res.send(error); // Send the error
                }
                let token = generateJWTToken(user.toJSON()); // Generate a JWT
                return res.json({ user, token }); // Return the user and the JWT
            });
        })(req, res);
    });
}