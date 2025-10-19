# Movie Watchlist - Part 3: Testing

This exercise builds upon the Movie Watchlist API from Part 2 by adding comprehensive testing using Jest. You will write both unit tests and integration tests to ensure the reliability of your application.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

3. Update the `.env` file with your MongoDB connection string and session secret.

## Tasks

1. Implement the unit tests in `tests/unit/utils/movieStats.test.js` for the `movieStats.js` file
2. Implement the integration tests in the `tests/integration/movies.test.js` for the `/movies` endpoints

You can run your tests with `npm test`.
