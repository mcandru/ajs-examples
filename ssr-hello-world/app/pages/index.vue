<script setup>
// This will get run on the server-side and the component will be rendered with that
// data. When the client hydrates, it will see that it already has that data and won't
// need to make a request on the client side
const {
  data: posts,
  error,
  status,
} = await useFetch("https://jsonplaceholder.typicode.com/posts?userId=1");
</script>

<template>
  <h1>Home</h1>
  <div>
    <article v-for="post in posts" :key="post.id">
      {{ post.title }}
    </article>
  </div>
</template>
