fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((response) => response.json())
  .then((user) => {
    console.log("User name:", user.name);
    console.log("User email:", user.email);
  })
  .catch((error) => {
    console.log("Error fetching user:", error);
  });

// Promises example activity to get a user and their posts.
const getUserAndPosts = (userId) => {
  const userPromise = fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  ).then((res) => res.json());

  const postsPromise = fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  ).then((res) => res.json());

  return Promise.all([userPromise, postsPromise])
    .then(([user, posts]) => {
      return {
        ...user,
        posts,
      };
    })
    .catch((err) => console.error("Error fetching user and posts", err));
};
