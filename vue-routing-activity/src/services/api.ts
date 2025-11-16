/**
 * API Service for JSONPlaceholder
 * Base URL: https://jsonplaceholder.typicode.com
 *
 * This service provides functions to fetch data from the JSONPlaceholder API.
 * All functions are async and return promises.
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com'

// Type definitions for JSONPlaceholder API responses
export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export interface Comment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

/**
 * Fetch all users
 * @returns Promise with array of user objects
 * Endpoint: GET /users
 */
export async function getUsers(): Promise<User[]> {
  // TODO: Implement this function
  // Fetch from `${BASE_URL}/users`
  // Return the parsed JSON response
  throw new Error('Not implemented')
}

/**
 * Fetch a single user by ID
 * @param userId - The user ID
 * @returns Promise with user object
 * Endpoint: GET /users/:id
 */
export async function getUser(userId: number | string): Promise<User> {
  // TODO: Implement this function
  // Fetch from `${BASE_URL}/users/${userId}`
  // Return the parsed JSON response
  throw new Error('Not implemented')
}

/**
 * Fetch all posts by a specific user
 * @param userId - The user ID
 * @returns Promise with array of post objects
 * Endpoint: GET /users/:id/posts
 */
export async function getUserPosts(userId: number | string): Promise<Post[]> {
  // TODO: Implement this function
  // Fetch from `${BASE_URL}/users/${userId}/posts`
  // Return the parsed JSON response
  throw new Error('Not implemented')
}

/**
 * Fetch a single post by ID
 * @param postId - The post ID
 * @returns Promise with post object
 * Endpoint: GET /posts/:id
 */
export async function getPost(postId: number | string): Promise<Post> {
  // TODO: Implement this function
  // Fetch from `${BASE_URL}/posts/${postId}`
  // Return the parsed JSON response
  throw new Error('Not implemented')
}

/**
 * Fetch all comments for a specific post
 * @param postId - The post ID
 * @returns Promise with array of comment objects
 * Endpoint: GET /posts/:id/comments
 */
export async function getPostComments(postId: number | string): Promise<Comment[]> {
  // TODO: Implement this function
  // Fetch from `${BASE_URL}/posts/${postId}/comments`
  // Return the parsed JSON response
  throw new Error('Not implemented')
}
