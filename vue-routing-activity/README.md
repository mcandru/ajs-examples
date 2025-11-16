# Vue Router Activity: Social Feed

A hands-on activity to practice Vue Router and API integration by building a social feed application.

## Overview

In this activity, you'll build a social media-style application with three main views:

1. **Home** - Recent posts feed (like Twitter/Reddit)
2. **User Profile** - User details and their posts
3. **Post Detail** - Full post with comments

All data comes from [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake REST API for testing.

The home page displays a feed of recent posts showing the author name (clickable) and post content. Clicking a post takes you to the full post with comments. Clicking an author name takes you to their profile page.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the URL shown (usually `http://localhost:5173`)

## What You'll Learn

- Configuring Vue Router with dynamic routes
- Using route parameters (`:id`)
- Navigating between routes programmatically
- Using `useRoute()` and `useRouter()` composables
- Fetching data from a REST API based on route params
- Working with TypeScript in Vue 3
- Type-safe API calls with interfaces
- Handling loading states
- Creating breadcrumb navigation
- Building a realistic social feed application

## Your Tasks

### TODO 1: Configure Routes

**File:** `src/router/index.ts`

Set up three routes in the `routes` array:

- `/` → Home component
- `/users/:id` → UserProfile component (with dynamic `:id` parameter)
- `/posts/:id` → PostDetail component (with dynamic `:id` parameter)

**Example route structure:**
```typescript
{
  path: '/example/:id',
  component: ExampleComponent
}
```

Once configured, uncomment the `<router-view />` in `App.vue`.

---

### Understanding the API Service

**File:** `src/services/api.ts`

The API service is already implemented for you! It provides six functions to fetch data from JSONPlaceholder:

- `getUsers()` - Fetch all users
- `getUser(userId)` - Fetch a single user
- `getPosts()` - Fetch all posts
- `getUserPosts(userId)` - Fetch posts by a user
- `getPost(postId)` - Fetch a single post
- `getPostComments(postId)` - Fetch comments on a post

All functions are async and return typed promises. Import the API service like this:

```typescript
import api, { type Post } from '../services/api'

// Then use it with namespacing:
const posts = await api.getPosts()
const user = await api.getUser(userId)
```

**Available API Endpoints:**
- GET `/users` - All users
- GET `/users/:id` - Single user
- GET `/posts` - All posts
- GET `/users/:id/posts` - User's posts
- GET `/posts/:id` - Single post
- GET `/posts/:id/comments` - Post comments

---

### TODO 2: Connect Views to Routes and Data

#### Home.vue

1. Import `api` and the `Post` type from the API service, and `useRouter` from vue-router
2. Create a custom interface `PostWithAuthor` that extends `Post` with an optional `authorName` property
3. Create reactive state for `posts` (typed as `PostWithAuthor[]`) and `loading`
4. Fetch posts when the component mounts using `onMounted()`
5. For each post, also fetch the author's name using `api.getUser(post.userId)`
6. Limit to the first 20 posts for better performance
7. Replace the static post card with a `v-for` loop over the `posts` array
8. Display the post title, body (excerpt), and author name
9. Make the author name clickable to navigate to `/users/${userId}`
10. Add a "Read More" button that navigates to `/posts/${postId}`
11. Show/hide loading state based on the `loading` variable

**Hints:**
- Use `Promise.all()` with `.map()` to fetch all author names concurrently
- The author name should be clickable with a hover effect (already styled)
- Use `router.push()` for programmatic navigation

#### UserProfile.vue

1. Import `api` and types from the API service
2. Import `useRoute` and `useRouter` from vue-router
3. Get the user ID from route params: `route.params.id`
4. Create reactive state for `user`, `posts`, and `loading`
5. Fetch user data and their posts when the component mounts
6. Replace static content with dynamic data from the API
7. Use `v-for` to loop through posts
8. Add a `viewPost(postId)` function that navigates to `/posts/${postId}`
9. Wire up the "Read More" button on each post

**Hints:**
- You can use `Promise.all()` to fetch user and posts simultaneously
- Update the breadcrumb to show the user's name

#### PostDetail.vue

1. Import `getPost`, `getPostComments`, `getUser` from the API service
2. Import `useRoute` from vue-router
3. Get the post ID from route params: `route.params.id`
4. Create reactive state for `post`, `comments`, `author`, and `loading`
5. Fetch post, comments, and author data when the component mounts
6. Replace static content with dynamic data from the API
7. Use `v-for` to loop through comments
8. Update the breadcrumb to link to the correct user profile

**Hints:**
- Fetch the post first, then use `post.userId` to fetch the author
- Use the first letter of the comment email for the avatar initial
- Show comment count in the section heading

---

## Success Criteria

Your app is complete when:

- ✅ You can see a feed of recent posts on the home page
- ✅ Each post shows the author name and post content
- ✅ Clicking an author name navigates to their profile
- ✅ Clicking "Read More" on a post navigates to the post detail page
- ✅ The user profile shows their info and a list of their posts
- ✅ Clicking a post on the profile navigates to the post detail page
- ✅ The post detail shows the full post and all comments
- ✅ All breadcrumbs work and link to the correct pages
- ✅ Loading states appear while data is being fetched
- ✅ The URL changes as you navigate (check the browser address bar)

## Bonus Challenges

Once you've completed the main tasks, try these extensions:

1. **Error Handling**: Add error states if API calls fail
2. **Back Button**: Add a "Back" button on detail pages using `router.back()`
3. **Route Transitions**: Add CSS transitions between route changes
4. **Empty States**: Show a message when a user has no posts or a post has no comments
5. **Search/Filter**: Add a search bar to filter posts on the home page by title
6. **Pagination**: Implement pagination for the posts feed (10 posts per page)
7. **Albums**: Add a fourth view for viewing user albums (JSONPlaceholder has `/users/:id/albums`)

## Project Structure

```
src/
├── views/
│   ├── Home.vue          # Recent posts feed
│   ├── UserProfile.vue   # User details + posts list
│   └── PostDetail.vue    # Post + comments
├── services/
│   └── api.ts            # API helper functions (TypeScript)
├── router/
│   └── index.ts          # Route configuration (TypeScript)
├── App.vue               # Main app component
├── main.ts               # App entry point (TypeScript)
└── style.css             # Global styles (complete)
```

## Tips

- Open the browser DevTools Network tab to see API requests
- Check the Vue DevTools to inspect component state and routes
- The JSONPlaceholder API is public and doesn't require authentication
- All styling is complete - focus on functionality!

## Resources

- [Vue Router Documentation](https://router.vuejs.org/)
- [JSONPlaceholder API Guide](https://jsonplaceholder.typicode.com/guide/)
- [Vue Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript with Vue](https://vuejs.org/guide/typescript/overview.html)

---

Good luck! Remember to test your app frequently and use `console.log()` to debug if needed.
