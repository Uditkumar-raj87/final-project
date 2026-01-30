const jwt = require('jsonwebtoken');

// In-memory user store
let users = [];

// Check if username is valid
const isValid = (username) => {
  return users.some(user => user.username === username);
};

// Authenticate user
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register a new user
const registerUser = (username, password) => {
  return new Promise((resolve, reject) => {
    if (isValid(username)) {
      reject("User already exists!");
    } else {
      users.push({ username, password });
      resolve({ message: "User successfully registered. Now you can login" });
    }
  });
};

// Check if user credentials are valid
const isValidLogin = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
};

// Generate token for login
const generateToken = (username) => {
  return jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });
};

module.exports = {
  users,
  isValid,
  authenticateToken,
  registerUser,
  isValidLogin,
  generateToken,
};
