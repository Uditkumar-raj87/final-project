#!/bin/bash

# Start the server
cd /workspaces/final-project
node index.js > server.log 2>&1 &
SERVER_PID=$!
sleep 3

echo "=== Task 1: GitHub Repository ==="
git remote -v

echo -e "\n=== Task 2: Get All Books ==="
curl -s -X GET http://localhost:5000/books

echo -e "\n=== Task 3: Get Book by ISBN ==="
curl -s -X GET "http://localhost:5000/books/isbn/978-0143039662"

echo -e "\n=== Task 4: Get Books by Author ==="
curl -s -X GET "http://localhost:5000/books/author/Chinua%20Achebe"

echo -e "\n=== Task 5: Get Books by Title ==="
curl -s -X GET "http://localhost:5000/books/title/Things%20Fall%20Apart"

echo -e "\n=== Task 6: Get Book Review ==="
curl -s -X GET "http://localhost:5000/review/978-0143039662"

echo -e "\n=== Task 7: Register User ==="
curl -s -X POST http://localhost:5000/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

echo -e "\n=== Task 8: Login User ==="
curl -s -X POST http://localhost:5000/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Kill the server
kill $SERVER_PID 2>/dev/null
