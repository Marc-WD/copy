<template>
  <div class="card">
    <img :src="post.image" alt="Post Image" />
    <div class="content">
      <h4>{{ post.title }}</h4>
      <p>{{ post.content }}</p>
      <span>❤️ {{ post.likes }} Likes</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  post: Object
});
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 300px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  background: #fff;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.content {
  padding: 15px;
}

h4 {
  margin-bottom: 10px;
}

span {
  color: #e74c3c;
  font-weight: bold;
}
</style>
