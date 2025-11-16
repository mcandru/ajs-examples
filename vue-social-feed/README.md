# Vue Social Feed

Build a functional social feed with Vue to practice using Vue Router and integrating APIs.

## Setup

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

## Your Task

Complete the social feed by implementing the missing Vue functionality. The scaffolding is provided, but you'll need to fill in:

- `Home.vue` that displays the social feed on the home page
- `Post.vue` that displays an individual post
- `User.vue` view that displays a users profile

Check out the routes in `src/router/index.ts` to see how the routes are defined and how to use them.

In each view you will need to add links that use the router to route to different views.

All data comes from [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake REST API for testing. An `api.ts` service is provided with functions to fetch the user and posts data that will be required.
