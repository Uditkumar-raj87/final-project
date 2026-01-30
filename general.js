const axios = require('axios');

let books = require("./books.json");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

// Get all books
const getBooks = async () => {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
};

// Get book by ISBN using async/await
const getBookByISBN = async (isbn) => {
  return new Promise((resolve, reject) => {
    let filtered_books = Object.keys(books).filter(
      (key) => books[key]["isbn"] === isbn
    );
    if (filtered_books.length > 0) {
      resolve(books[filtered_books[0]]);
    } else {
      reject("No books found with the given ISBN");
    }
  });
};

// Get books by Author using promise callbacks
const getBooksByAuthor = (author) => {
  return new Promise((resolve, reject) => {
    let filtered_books = Object.keys(books).filter(
      (key) => books[key]["author"].toLowerCase() === author.toLowerCase()
    );
    if (filtered_books.length > 0) {
      resolve(filtered_books.map((key) => books[key]));
    } else {
      reject("No books found with the given Author");
    }
  });
};

// Get books by Title using async/await
const getBooksByTitle = async (title) => {
  return new Promise((resolve, reject) => {
    let filtered_books = Object.keys(books).filter(
      (key) => books[key]["title"].toLowerCase() === title.toLowerCase()
    );
    if (filtered_books.length > 0) {
      resolve(filtered_books.map((key) => books[key]));
    } else {
      reject("No books found with the given Title");
    }
  });
};

// Get book review
const getBookReview = async (isbn) => {
  return new Promise((resolve, reject) => {
    let book = Object.keys(books).filter(
      (key) => books[key]["isbn"] === isbn
    );
    if (book.length > 0) {
      resolve(books[book[0]]["reviews"]);
    } else {
      reject("No books found with the given ISBN");
    }
  });
};

// Add or modify review
const addBookReview = async (isbn, review, username) => {
  return new Promise((resolve, reject) => {
    let book = Object.keys(books).filter(
      (key) => books[key]["isbn"] === isbn
    );
    if (book.length > 0) {
      books[book[0]]["reviews"][username] = review;
      resolve(books[book[0]]);
    } else {
      reject("No books found with the given ISBN");
    }
  });
};

// Delete review
const deleteBookReview = async (isbn, username) => {
  return new Promise((resolve, reject) => {
    let book = Object.keys(books).filter(
      (key) => books[key]["isbn"] === isbn
    );
    if (book.length > 0) {
      delete books[book[0]]["reviews"][username];
      resolve(books[book[0]]);
    } else {
      reject("No books found with the given ISBN");
    }
  });
};

module.exports = {
  getBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getBookReview,
  addBookReview,
  deleteBookReview,
};
