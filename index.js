const express = require('express');
const jwt = require('jsonwebtoken');
const general = require('./general');
const auth = require('./auth_users');

const app = express();

app.use(express.json());

// ==================== Public Routes ====================

// Get all books
app.get('/books', async (req, res) => {
  try {
    const books = await general.getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book by ISBN
app.get('/books/isbn/:isbn', async (req, res) => {
  try {
    const book = await general.getBookByISBN(req.params.isbn);
    res.json(book);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Get books by Author
app.get('/books/author/:author', async (req, res) => {
  try {
    const books = await general.getBooksByAuthor(req.params.author);
    res.json(books);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Get books by Title
app.get('/books/title/:title', async (req, res) => {
  try {
    const books = await general.getBooksByTitle(req.params.title);
    res.json(books);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Get book reviews
app.get('/review/:isbn', async (req, res) => {
  try {
    const review = await general.getBookReview(req.params.isbn);
    res.json(review);
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// ==================== User Registration & Login ====================

// Register a new user
app.post('/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  try {
    const message = await auth.registerUser(username, password);
    res.json(message);
  } catch (error) {
    res.status(409).json({ message: error });
  }
});

// Login user
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (auth.isValidLogin(username, password)) {
    const token = auth.generateToken(username);
    res.json({ message: "Login successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// ==================== Protected Routes ====================

// Add or modify a book review (requires authentication)
app.put('/review/:isbn', auth.authenticateToken, async (req, res) => {
  try {
    const review = req.body.review;
    const username = req.user.username;
    const book = await general.addBookReview(req.params.isbn, review, username);
    res.json({
      message: "Review added/updated successfully",
      reviews: book.reviews
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// Delete a book review (requires authentication)
app.delete('/review/:isbn', auth.authenticateToken, async (req, res) => {
  try {
    const username = req.user.username;
    const book = await general.deleteBookReview(req.params.isbn, username);
    res.json({
      message: "Review deleted successfully",
      reviews: book.reviews
    });
  } catch (error) {
    res.status(404).json({ message: error });
  }
});

// ==================== Server Setup ====================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
