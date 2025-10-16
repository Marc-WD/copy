<template>
  <div class="container container-grey-background">
    <h3 class="text-center">Manage Blog Posts</h3>
    <div class="row">
      <template v-if="blogPosts.length > 0">
        <UserBlogCard
          v-for="(post, index) in blogPosts"
          :key="index"
          :img="`http://localhost:3000/uploads/${post.image}`"
          :title="post.title"
          :description="post.description"
          :createdAt="post.createdAt"
          :showActions="true"
          :showReadMore="true"
          :postId="post._id"
          @delete="handleDelete(post._id)"
        />
      </template>
      <p v-else>No posts found</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import UserBlogCard from "@/views/user/UserBlogCard.vue"; // adjust based on your actual structure

const blogPosts = ref([]);

const fetchAllBlogPosts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/all-blog-posts");
    blogPosts.value = response.data.data;
  } catch (error) {
    console.error("Error fetching all blog posts:", error);
  }
};

const handleDelete = async (postId) => {
  try {
    await axios.post("http://localhost:3000/delete-post", { postId });
    blogPosts.value = blogPosts.value.filter((post) => post._id !== postId);
    alert("Post deleted successfully");
  } catch (error) {
    console.error("Error deleting blog post:", error);
  }
};

onMounted(fetchAllBlogPosts);
</script>

<style scoped>
.container-grey-background {
  background-color: #d6d7fc;
  padding: 20px;
  border-radius: 5px;
}
</style>
