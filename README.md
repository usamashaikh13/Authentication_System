# Authentication System

This is an authentication system with role-based authentication, question management, and solution submission functionalities.

## Features

- Role-based authentication system for admin and participants.
- Secure signup and login functionality with password encryption.
- JWT-based access tokens for user authentication.
- Admin APIs to add, edit, and delete questions.
- Admin APIs to add test cases to questions.
- User API to submit solutions for questions.
- Solution evaluation using the Sphere Engine API (placeholder implementation).
- Pagination support for fetching user questions or admin submissions.
- Email notification to users with their submission response.
- Front-end implementation for user interaction (screenshots included).
- Optional containerization of the application.

## Technologies Used

- Node.js
- Express.js
- MongoDB (or AWS DynamoDB)
- Mongoose
- bcrypt (for password encryption)
- jsonwebtoken (JWT-based authentication)
- SendGrid (or any other free mailing service)
- Docker (optional)

## Setup and Usage

1. Clone the repository:

   ```shell
   git clone https://github.com/your-username/authentication-system.git

2. Set up the environment:

Configure the MongoDB or AWS DynamoDB connection in index.js.
Set up the mailing service credentials in the email notification function.

3. Start the server:
node index.js

4. Open your browser and access the front-end application at http://localhost:3000 or use Postman for testing

