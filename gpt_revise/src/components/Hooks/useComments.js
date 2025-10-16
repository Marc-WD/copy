// src/composables/useComments.js
import { ref, onMounted } from "vue";
import api from '../../services/api';


export default function useComments(postId) {
  const comments = ref([]);
  const commentCount = ref(0);
  const commentText = ref("");

  const fetchComments = async () => {
    try {
      const response = await api.get(`/packages/${postId}/reviews`);
      comments.value = response.data;
      commentCount.value = response.data.length;
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleCommentSubmit = async (userId) => {
    if (!userId) {
      alert("Sign in required to comment on posts.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3000/comment/${postId}`, {
        userId,
        commentText: commentText.value,
      });
      if (response.data.message === "Comment added successfully") {
        comments.value.push(response.data.comment);
        commentText.value = "";
        commentCount.value++;
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  onMounted(fetchComments);

  return {
    comments,
    commentCount,
    commentText,
    handleCommentSubmit,
  };
}
