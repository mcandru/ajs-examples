const getUser = (userId) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      console.log("User name:", user.name);
      console.log("User email:", user.email);
      return user;
    });
};

getUser(1)
  .then((user) => console.log(user))
  .catch((error) => console.error(`Failed to get user: ${error}`));

// Using async/await
const getAsyncUser = async (userId) => {
  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  const user = await userResponse.json();
  console.log("User name:", user.name);
  console.log("User email:", user.email);
  return user;
};

getAsyncUser(1)
  .then((user) => console.log(user))
  .catch((error) => console.error(`Failed to get user: ${error}`));

// This doesn't work at the top level
// try {
//   const user = await getAsyncUser(1);
//   console.log(user);
// } catch (error) {
//   console.error("Failed to get user:", error);
// }

// Promises example activity to get a user and their posts.
const getUserAndPosts = (userId) => {
  const userPromise = fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  ).then((res) => res.json());

  const postsPromise = fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  ).then((res) => res.json());

  return Promise.all([userPromise, postsPromise]).then((result) => {
    const [user, posts] = result;
    return {
      ...user,
      posts,
    };
  });
};

const getUserAndPostsAsync = async (userId) => {
  const userRequest = fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  const postsRequest = fetch(
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
  );

  const [userResponse, postsResponse] = await Promise.all([
    userRequest,
    postsRequest,
  ]);

  const user = await userResponse.json();
  const posts = await postsResponse.json();

  return {
    ...user,
    posts,
  };
};
