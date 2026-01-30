# Express Book Review Application - Testing Guide

## Before Running Tests

1. Start the server with:
```bash
node index.js
```

The server will run on http://localhost:5000

---

## Task 1: GitHub Repository Information
**Command:**
```bash
git remote -v
```

**Expected Output:**
```
origin  https://github.com/Uditkumar-raj87/final-project (fetch)
origin  https://github.com/Uditkumar-raj87/final-project (push)
```

**Save as:** `githubrepo`

---

## Task 2: Get All Books
**Command:**
```bash
curl -X GET http://localhost:5000/books
```

**Save as:** `getallbooks`

---

## Task 3: Get Books by ISBN
**Command:**
```bash
curl -X GET "http://localhost:5000/books/isbn/978-0143039662"
```

**Save as:** `getbooksbyISBN`

---

## Task 4: Get Books by Author
**Command:**
```bash
curl -X GET "http://localhost:5000/books/author/Chinua%20Achebe"
```

**Save as:** `getbooksbyauthor`

---

## Task 5: Get Books by Title
**Command:**
```bash
curl -X GET "http://localhost:5000/books/title/Things%20Fall%20Apart"
```

**Save as:** `getbooksbytitle`

---

## Task 6: Get Book Review
**Command:**
```bash
curl -X GET "http://localhost:5000/review/978-0143039662"
```

**Save as:** `getbookreview`

---

## Task 7: Register New User
**Command:**
```bash
curl -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"password123"}'
```

**Expected Output:**
```json
{"message":"User successfully registered. Now you can login"}
```

**Save as:** `register`

---

## Task 8: Login User
**Command:**
```bash
curl -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"john","password":"password123"}'
```

**Expected Output:**
```json
{"message":"Login successful","token":"<JWT_TOKEN>"}
```

**Save as:** `login`

---

## Task 9: Add/Modify Book Review
**Command (with token from Task 8):**
```bash
curl -X PUT "http://localhost:5000/review/978-0143039662" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <TOKEN>" \
  -d '{"review":"Great book! Highly recommended."}'
```

**Expected Output:**
```json
{
  "message":"Review added/updated successfully",
  "reviews":{
    "john":"Great book! Highly recommended."
  }
}
```

**Save as:** `reviewadded`

---

## Task 10: Delete Book Review
**Command (with token from Task 8):**
```bash
curl -X DELETE "http://localhost:5000/review/978-0143039662" \
  -H "Authorization: Bearer <TOKEN>"
```

**Expected Output:**
```json
{
  "message":"Review deleted successfully",
  "reviews":{}
}
```

**Save as:** `deletereview`

---

## Task 11: GitHub URL for general.js
**File Location:**
```
/workspaces/final-project/general.js
```

**GitHub URL:**
```
https://github.com/Uditkumar-raj87/final-project/blob/main/general.js
```

This file contains implementations using both:
- Promise callbacks (getBooksByAuthor)
- Async/await patterns (getBooks, getBookByISBN, getBooksByTitle, getBookReview, addBookReview, deleteBookReview)

---

## Project Structure
```
/workspaces/final-project/
├── index.js          - Main Express server and routes
├── general.js        - Book operations and CRUD logic
├── auth_users.js     - User authentication and JWT management
├── books.json        - Book data source
├── package.json      - Dependencies and scripts
└── README.md         - Project documentation
```

## Key Features Implemented

1. **Get all books** - Retrieves complete book list
2. **Search by ISBN** - Finds book by ISBN code using async/await
3. **Search by Author** - Finds books by author name using promises
4. **Search by Title** - Finds books by title using async/await
5. **Get reviews** - Retrieves reviews for a specific book
6. **User Registration** - Register new users
7. **User Login** - Login with JWT token generation
8. **Add/Modify Review** - Authenticated users can add or update reviews
9. **Delete Review** - Authenticated users can delete their reviews

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. To access protected endpoints (add/delete reviews), you must:

1. Register a user
2. Login to get a token
3. Include the token in the Authorization header: `Authorization: Bearer <token>`
