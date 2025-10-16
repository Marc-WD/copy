<template>
  <div class="container">
    <h3 class="text-center">Top 3 Liked Posts</h3>

    <div class="row">
      <template v-if="topPosts.length > 0">
        <div
          v-for="(post, index) in topPosts"
          :key="post._id || index"
          class="card"
        >
          <img
            :src="post.images && post.images[0] ? `http://localhost:5000/${post.images[0]}` : 'https://via.placeholder.com/300x200'"
            alt="Post Image"
          />
          <h4>{{ post.title }}</h4>
          <p>{{ post.description }}</p>

          <div class="likes">
            <button @click="likePost(post._id)">❤️ Like</button>
            <span>{{ post.likes }} likes</span>
          </div>
        </div>
      </template>

      <p v-else>No top liked posts found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const topPosts = ref([]);

// Fetch data
const fetchTopLikedPosts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/top-liked-posts");
    topPosts.value = response.data.data;
  } catch (error) {
    console.error("Error fetching top liked posts:", error);
  }
};

// Like post
const likePost = async (id) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/packages/${id}/like`);
    // Update local likes instantly
    const post = topPosts.value.find(p => p._id === id);
    if (post) post.likes = res.data.likes;
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

// Lifecycle
onMounted(fetchTopLikedPosts);
</script>

<style scoped>
.container {
  margin-top: 30px;
  text-align: center;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}

.card {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 12px;
  width: 300px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card img {
  width: 100%;
  border-radius: 8px;
}

.likes {
  margin-top: 10px;
}

.likes button {
  border: none;
  background: #ff4b4b;
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
}

.likes button:hover {
  background: #d93a3a;
}

.likes span {
  margin-left: 10px;
  color: #555;
}
</style>
