<template>
  <div>
    <div class="container container-grey-background">
      <h1 class="text-center">Blog Page</h1>
      <p class="text-center">
        Welcome to the Blog page. Here you will find various articles and posts.
      </p>
    </div>

    <div class="container mt-2 container-grey-background">
      <div v-if="loading" class="loading">Loading...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else class="row">
        <HomeBlogCard v-if="blogPosts.length > 0" :blogPosts="blogPosts" />
        <p v-else class="text-center">No blog posts available.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import HomeBlogCard from '../components/HomeCard/HomeBlogCard.vue'

// State
const blogPosts = ref([])
const loading = ref(true)
const error = ref('')

// Fetch blog posts from backend
const fetchBlogPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/all-blog-posts')
    blogPosts.value = response.data.data
  } catch (err) {
    console.error('Error fetching blog posts:', err)
    error.value = 'Failed to load blog posts. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(fetchBlogPosts)
</script>

<style scoped>
.container-grey-background {
  background-color: #d6d7fc;
  padding: 20px;
  border-radius: 5px;
}

.loading {
  text-align: center;
  font-size: 24px;
  padding: 50px;
}

.error {
  text-align: center;
  color: red;
  font-size: 18px;
  padding: 20px;
}
</style>

