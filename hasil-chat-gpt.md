Certainly! Here are a few examples of Node.js backend applications using JWT (JSON Web Tokens):

User Authentication and Authorization:
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Login route to generate and return JWT token
app.post('/login', (req, res) => {
  // Authenticate user credentials

  // Generate JWT token
  const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '1h' });

  // Return token as response
  res.json({ token });
});

// Protected route that requires JWT authentication
app.get('/protected', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Token is valid, continue processing
    res.json({ message: 'Protected data' });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
Middleware for JWT Authentication:
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Token is valid, store the decoded information in the request object
    req.user = decoded;
    next();
  });
};

// Protected route that requires JWT authentication
app.get('/protected', authenticateJWT, (req, res) => {
  // Access user information from req.user
  res.json({ message: 'Protected data' });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```
These examples demonstrate how to use JWT tokens for user authentication and protect routes that require authentication using middleware. Remember to replace 'secret_key' with your own secret key for token signing and verification.