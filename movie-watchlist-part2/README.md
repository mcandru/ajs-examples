# Movie Watchlist - Part 2: Session-Based Authentication

### Setup

1. Install dependencies: `npm install`
2. Start MongoDB on port 27017. If you haven't got a MongoDB container already, run:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo
   ```
3. Import the Postman collection to test the API
4. Rename `.env.example` to `.env`
5. Seed the database with `npm run seed`
6. Start the development server: `npm run dev`

## Your Task

Refactor the application to implement session-based authentication with the following endpoints:

### Required Endpoints

#### 1. POST `/auth/register`

- Create a new user account
- **Request body:**
  ```json
  {
    "email": "user@example.com",
    "name": "User Name",
    "password": "password123"
  }
  ```
- Hash the password using `User.hashPassword()` before storing
- Return the created user (without password)
- Automatically log the user in (create session)

#### 2. POST `/auth/login`

- Authenticate a user and create a session
- **Request body:**
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- Verify password using `user.verifyPassword(password)`
- Return the authenticated user

#### 3. POST `/auth/logout` (auth required)

- Destroy the current user session
- Clear the session cookie
- Only accessible to authenticated users

#### 4. GET `/movies` (auth required)

- Get all movies for the authenticated user
- Only return movies belonging to the logged-in user

#### 5. POST `/movies` (auth required)

- Create a new movie for the authenticated user
- **Request body:**
  ```json
  {
    "title": "Movie Title",
    "year": 2024,
    "watched": false,
    "rating": 8.5
  }
  ```
- Automatically associate the movie with the authenticated user

### Important Notes

- **Only return movies belonging to the logged-in user** - use the session user ID to filter movies
- Use the `passwordHash` property (not plain text passwords) for user authentication
- The `User` model includes helper methods:
  - `User.hashPassword(password)` - Static method to hash passwords
  - `user.verifyPassword(password)` - Instance method to verify passwords

## Session Management

Configure `express-session` with:

- Session secret from environment variable
- Appropriate cookie settings
- MongoDB session store using `connect-mongo`

## Testing Your Implementation

Use the provided Postman collection (`movie-watchlist-part2.postman_collection.json`) to test your endpoints, or use the API testing tool of your choice.
