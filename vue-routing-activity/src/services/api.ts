/**
 * API Service for JSONPlaceholder
 * Base URL: https://jsonplaceholder.typicode.com
 *
 * This service provides functions to fetch data from the JSONPlaceholder API.
 * All functions are async and return promises.
 */

import type { User, Post, Comment } from "@/types/api";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
};

const getUser = async (userId: number | string): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);
  return response.json();
};

const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/posts`);
  const posts = (await response.json()) as Post[];
  return posts.sort(() => Math.random() - 0.5).slice(0, 10);
};

const getUserPosts = async (userId: number | string): Promise<Post[]> => {
  const response = await fetch(`${BASE_URL}/users/${userId}/posts`);
  return response.json();
};

const getPost = async (postId: number | string): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}`);
  return response.json();
};

const getPostComments = async (postId: number | string): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  return response.json();
};

export default {
  getUsers,
  getUser,
  getPosts,
  getUserPosts,
  getPost,
  getPostComments,
};
