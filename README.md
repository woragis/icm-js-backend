# Backend to receive and save ICM contribution data from bible study _currently studying 'Cantares'_

## Routes

### Default ('/')

- Receives a POST request and saves the contribution data in PostgreSQL
- Sends back if the data was successfully saved or not

### Report ('/report')

- Receives a POST request with the report data, and the reporter contact information and name
- Saves all of this data
- Sends back if the request was successfully treated or not

### Authentication ('/auth')

- Receives a POST request regarding register or login functions
- When receiving a **Register** request, the backend tests if the email is available, then saves all the useful data for the user, like _name, phone number, email,_ and _password_
- When receiving a **Login** request, the backend tests if the email exists, then it tests if the password was correct, comparing to a encrypted password hash
- Then all of these functions return if the user was successfully registered or logged in
