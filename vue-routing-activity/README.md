# Vue Router Activity: Social Feed

A hands-on activity to practice Vue Router and API integration by building a social feed application.

## Overview

In this activity, you'll build a social media-style application with three main views:

1. **Home** - Grid of user cards
2. **User Profile** - User details and their posts
3. **Post Detail** - Full post with comments

All data comes from [JSONPlaceholder](https://jsonplaceholder.typicode.com/), a free fake REST API for testing.

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
- Fetching data from a REST API
- Using `useRoute()` and `useRouter()` composables
- Working with TypeScript in Vue 3
- Type-safe API interfaces and function signatures
- Handling loading states
- Creating breadcrumb navigation

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

### TODO 2: Implement API Calls

**File:** `src/services/api.ts`

Implement five API functions using the `fetch` API. Type definitions for `User`, `Post`, and `Comment` are already provided in the file.

- `getUsers()` - Fetch all users
- `getUser(userId)` - Fetch a single user
- `getUserPosts(userId)` - Fetch posts by a user
- `getPost(postId)` - Fetch a single post
- `getPostComments(postId)` - Fetch comments on a post

**Example implementation:**
```typescript
export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/users`)
  return response.json()
}
```

**API Endpoints:**
- GET `/users` - All users
- GET `/users/:id` - Single user
- GET `/users/:id/posts` - User's posts
- GET `/posts/:id` - Single post
- GET `/posts/:id/comments` - Post comments

---

### TODO 3: Connect Views to Routes and Data

#### Home.vue

1. Import `getUsers` and the `User` type from the API service, and `useRouter` from vue-router
2. Create reactive state for `users` (typed as `User[]`) and `loading`
3. Fetch users when the component mounts using `onMounted()`
4. Replace the static user cards with a `v-for` loop over the `users` array
5. Display the user's name, email, and company
6. Add a `viewProfile(userId)` function that navigates to `/users/${userId}`
7. Wire up the "View Profile" button to call `viewProfile`
8. Show/hide loading state based on the `loading` variable

**Hints:**
- Use the first letter of the user's name for the avatar initial
- Use `router.push()` for programmatic navigation

#### UserProfile.vue

1. Import `getUser`, `getUserPosts` from the API service
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

- ✅ You can see a grid of users on the home page
- ✅ Clicking a user card navigates to their profile
- ✅ The user profile shows their info and a list of their posts
- ✅ Clicking a post navigates to the post detail page
- ✅ The post detail shows the full post and all comments
- ✅ All breadcrumbs work and link to the correct pages
- ✅ Loading states appear while data is being fetched
- ✅ The URL changes as you navigate (check the browser address bar)

## Bonus Challenges

Once you've completed the main tasks, try these extensions:

1. **Error Handling**: Add error states if API calls fail
2. **Back Button**: Add a "Back" button on detail pages using `router.back()`
3. **Route Transitions**: Add CSS transitions between route changes
4. **Empty States**: Show a message when a user has no posts
5. **Search**: Add a search bar to filter users on the home page
6. **Albums**: Add a fourth view for viewing user albums (JSONPlaceholder has `/users/:id/albums`)

## Project Structure

```
src/
├── views/
│   ├── Home.vue          # User grid (home page)
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
