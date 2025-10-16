<template>
  <div class="container container-grey-background">
    <div class="row">
      <div class="col-10 mx-auto">
        <h1>{{ blogPost?.title }}</h1>

        <img
          v-if="blogPost?.image"
          :src="`http://localhost:3000/uploads/${blogPost.image}`"
          :alt="blogPost.title"
          class="img-fluid fixed-image"
        />

        <p>{{ blogPost?.description }}</p>
        <p class="text-muted">
          Posted {{ formattedDate(blogPost?.createdAt) }}
        </p>

        <div class="d-flex justify-content-start align-items-center gap-3">
          <!-- LIKE BUTTON WITH TOOLTIP -->
          <button
            class="btn btn-link"
            :class="{ 'text-danger': liked }"
            @click="handleLike"
            @mouseenter="fetchLikeUsers"
            aria-label="Like post"
            title="View who liked"
          >
            <i class="fa fa-heart"></i> {{ likeCount }}
          </button>

          <!-- COMMENT COUNT -->
          <button class="btn btn-link" aria-label="Show comments">
            <i class="fa fa-comment"></i> {{ commentCount }}
          </button>
        </div>

        <!-- COMMENTS SECTION -->
        <div class="comments-section mt-3">
          <h3>Comments ({{ commentCount }})</h3>
          <textarea
            v-model="commentText"
            class="form-control"
            rows="2"
            placeholder="Add a comment..."
          ></textarea>
          <button class="btn btn-primary mt-2" @click="submitComment">
            Submit
          </button>

          <div v-if="comments.length > 0" class="mt-3">
            <div
              v-for="comment in comments"
              :key="comment._id"
              class="border p-2 rounded mb-2"
            >
              <strong>{{ comment.userId?.fname }} {{ comment.userId?.lname }}</strong>
              <p>{{ comment.commentText }}</p>
              <small class="text-muted">
                {{ formattedDate(comment.createdAt) }}
              </small>
            </div>
          </div>

          <p v-else>No comments yet. Be the first to comment!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import moment from 'moment'

// Route param
const route = useRoute()
const id = route.params.id

// Blog post data
const blogPost = ref(null)
const loading = ref(true)

// Likes
const liked = ref(false)
const likeCount = ref(0)
const likeUsers = ref([])

// Comments
const comments = ref([])
const commentCount = ref(0)
const commentText = ref('')

// ✅ Fetch Blog Post
const fetchBlogPost = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/blog/${id}`)
    blogPost.value = response.data.data
  } catch (err) {
    console.error('Error fetching blog post:', err)
  } finally {
    loading.value = false
  }
}

// ✅ Like Handlers
const handleLike = async () => {
  try {
    const response = await axios.post(`http://localhost:3000/like/${id}`, {
      userId: localStorage.getItem('userId'),
    })
    liked.value = response.data.liked
    likeCount.value = response.data.likeCount
  } catch (err) {
    console.error('Error liking post:', err)
  }
}

const fetchLikeUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/like/users/${id}`)
    likeUsers.value = response.data.users
  } catch (err) {
    console.error('Error fetching like users:', err)
  }
}

// ✅ Comments
const fetchComments = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/comments/${id}`)
    comments.value = response.data.comments
    commentCount.value = comments.value.length
  } catch (err) {
    console.error('Error fetching comments:', err)
  }
}

const submitComment = async () => {
  try {
    const userId = localStorage.getItem('userId')
    if (!userId || !commentText.value.trim()) return

    await axios.post(`http://localhost:3000/comments/${id}`, {
      userId,
      commentText: commentText.value,
    })

    commentText.value = ''
    fetchComments()
  } catch (err) {
    console.error('Error submitting comment:', err)
  }
}

// ✅ Utility: format date with moment
const formattedDate = (date) => moment(date).fromNow()

// Mount
onMounted(() => {
  fetchBlogPost()
  fetchComments()
})
</script>

<style scoped>
.container-grey-background {
  background-color: #d6d7fc;
  padding: 20px;
  border-radius: 5px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.img-fluid {
  height: 320px;
  width: 50%;
  object-fit: auto;
  margin-bottom: 20px;
}

.loading {
  text-align: center;
  font-size: 24px;
  padding: 50px;
}

.comments-section {
  margin-top: 20px;
}

.comments-section h3 {
  margin-bottom: 20px;
}

.comments-section textarea {
  margin-bottom: 10px;
}

.btn-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  font-size: 1rem;
}

.btn-link .fa-heart,
.btn-link .fa-comment {
  margin-right: 5px;
}

.border {
  border: 1px solid #dee2e6;
}

.p-2 {
  padding: 10px;
}

.rounded {
  border-radius: 5px;
}

.mb-2 {
  margin-bottom: 10px;
}

</style>

