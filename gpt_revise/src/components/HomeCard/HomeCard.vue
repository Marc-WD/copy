<template>
  <div class="col-md-4" style="margin-bottom: 15px">
    <div class="card mb-4 shadow-sm">
      <img
        :src="`http://localhost:3000/uploads/${post.image}`"
        :alt="post.title"
        class="card-img-top fixed-image"
      />
      <div class="card-body">
        <h5 class="card-title">{{ limitedTitle }}</h5>
        <p class="card-text">{{ limitedDescription }}</p>
        <p class="card-text text-muted">{{ formattedDate }}</p>
      </div>

      <div class="card-footer">
        <button
          class="btn btn-link"
          :class="{ 'text-danger': liked }"
          @mouseenter="fetchLikeUsers"
          @click="handleLike"
          title="Liked by: {{ likeUsersTooltip }}"
        >
          <font-awesome-icon icon="heart" /> {{ likeCount }}
        </button>

        <button class="btn btn-link" @click="toggleComments">
          <font-awesome-icon icon="comment" /> {{ commentCount }}
        </button>

        <button type="button" class="btn btn-primary" @click="handleReadMore">
          Read More +
        </button>
      </div>

      <div v-if="showComments" class="mt-3">
        <textarea
          v-model="commentText"
          class="form-control"
          rows="2"
          placeholder="Add a comment..."
        ></textarea>
        <button
          class="btn btn-primary mt-2"
          @click="handleCommentSubmit(localStorage.getItem('userId'))"
        >
          Submit
        </button>
      </div>

      <div v-if="showComments" class="mt-3">
        <div
          v-for="comment in comments"
          :key="comment._id"
          class="border p-2 rounded mb-2"
        >
          <strong>{{ comment.userId.fname }} {{ comment.userId.lname }}</strong>
          <p>{{ comment.commentText }}</p>
          <small class="text-muted">{{ formatDate(comment.createdAt) }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import moment from "moment";
import useLikePost from "../Hooks/useLikePost";
import useComments from "../Hooks/useComments";
import useLimitText from "../Hooks/useLimitText";
import "./HomeCard.css";

// Props
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

// State
const showComments = ref(false);

// Hooks
const { liked, likeCount, likeUsers, handleLike, fetchLikeUsers } = useLikePost(props.post._id);
const { comments, commentCount, commentText, setCommentText, handleCommentSubmit } = useComments(props.post._id);

// Computed values
const limitedTitle = computed(() => useLimitText(props.post.title, 35));
const limitedDescription = computed(() => useLimitText(props.post.description, 135));
const formattedDate = computed(() => moment(props.post.createdAt).fromNow());
const likeUsersTooltip = computed(() =>
  likeUsers.value.length > 0
    ? likeUsers.value.map((user) => `${user.fname} ${user.lname}`).join(", ")
    : "No likes yet"
);

// Methods
function handleReadMore() {
  router.push(`/blog-details/${props.post._id}`);
}

function toggleComments() {
  showComments.value = !showComments.value;
}

function formatDate(date) {
  return moment(date).fromNow();
}
</script>

<style scoped>
.fixed-image {
  width: 100%;
  height: 200px; /* Adjust the height as needed */
  object-fit: auto; /* Ensures the image covers the entire area without distortion */
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-body {
  flex-grow: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
