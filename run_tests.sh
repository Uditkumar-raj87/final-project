#!/bin/bash

# Start server
cd /workspaces/final-project
node index.js &
SERVER_PID=$!
sleep 3

echo "Server started with PID: $SERVER_PID"

# Function to save curl command and output
save_curl_test() {
    local filename=$1
    local method=$2
    local url=$3
    local data=$4
    local headers=$5
    
    echo "Testing: $filename"
    
    if [ -n "$data" ]; then
        output=$(curl -s -X "$method" "$url" -H "$headers" -d "$data")
    else
        output=$(curl -s -X "$method" "$url" $headers)
    fi
    
    # Save both command and output
    {
        echo "=== CURL Command ==="
        if [ -n "$data" ]; then
            echo "curl -X $method \"$url\" -H \"$headers\" -d '$data'"
        else
            echo "curl -X $method \"$url\" $headers"
        fi
        echo ""
        echo "=== Output ==="
        echo "$output"
    } > "/workspaces/final-project/$filename.txt"
    
    echo "Saved to /workspaces/final-project/$filename.txt"
    echo ""
}

# Task 1: GitHub Repository
echo "=== Task 1: GitHub Repository ===" > /workspaces/final-project/githubrepo.txt
git remote -v >> /workspaces/final-project/githubrepo.txt 2>&1

# Task 2: Get All Books
save_curl_test "getallbooks" "GET" "http://localhost:5000/books" "" ""

# Task 3: Get Books by ISBN
save_curl_test "getbooksbyISBN" "GET" "http://localhost:5000/books/isbn/978-0143039662" "" ""

# Task 4: Get Books by Author
save_curl_test "getbooksbyauthor" "GET" "http://localhost:5000/books/author/Chinua%20Achebe" "" ""

# Task 5: Get Books by Title
save_curl_test "getbooksbytitle" "GET" "http://localhost:5000/books/title/Things%20Fall%20Apart" "" ""

# Task 6: Get Book Review
save_curl_test "getbookreview" "GET" "http://localhost:5000/review/978-0143039662" "" ""

# Task 7: Register User
save_curl_test "register" "POST" "http://localhost:5000/register" \
    '{"username":"john","password":"password123"}' \
    "Content-Type: application/json"

# Task 8: Login User
login_output=$(curl -s -X POST "http://localhost:5000/login" \
    -H "Content-Type: application/json" \
    -d '{"username":"john","password":"password123"}')
    
{
    echo "=== CURL Command ==="
    echo 'curl -X POST "http://localhost:5000/login" -H "Content-Type: application/json" -d '\''{\"username\":\"john\",\"password\":\"password123\"}'\'
    echo ""
    echo "=== Output ==="
    echo "$login_output"
} > "/workspaces/final-project/login.txt"

# Extract token from login response
TOKEN=$(echo "$login_output" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)
echo "Token: $TOKEN"

# Task 9: Add Review
save_curl_test "reviewadded" "PUT" "http://localhost:5000/review/978-0143039662" \
    '{"review":"This is a great book!"}' \
    "Content-Type: application/json, Authorization: Bearer $TOKEN"

# Task 10: Delete Review
{
    echo "=== CURL Command ==="
    echo "curl -X DELETE \"http://localhost:5000/review/978-0143039662\" -H \"Authorization: Bearer $TOKEN\""
    echo ""
    echo "=== Output ==="
    curl -s -X DELETE "http://localhost:5000/review/978-0143039662" -H "Authorization: Bearer $TOKEN"
} > "/workspaces/final-project/deletereview.txt"

# Kill server
kill $SERVER_PID 2>/dev/null
echo ""
echo "Server stopped"
echo "All tests completed. Check the .txt files in /workspaces/final-project/"
