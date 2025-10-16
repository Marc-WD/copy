// src/composables/useLikePost.js
import { ref, onMounted } from "vue";
import api from '../../services/api';


export default function useLikePost(postId) {
  const liked = ref(false);
  const likeCount = ref(0);
  const likeUsers = ref([]);

  const fetchInitialData = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await api.get(`/packages/${postId}`); // fetch package to know if user liked

        liked.value = response.data.liked;
      } catch (error) {
        console.error("Error fetching liked status:", error);
      }
    }

    try {
      const likeCountResponse = await axios.get(`http://localhost:3000/likes/${postId}/count`);
      likeCount.value = likeCountResponse.data.count;
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  const handleLike = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Sign in required to like posts.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:3000/like-post/${postId}`, { userId });
      if (response.data.status === "ok") {
        liked.value = response.data.liked;
        likeCount.value = response.data.data;
      }
    } catch (error) {
      console.error("Error liking/disliking the post:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const fetchLikeUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/likes/${postId}`);
      likeUsers.value = response.data;
    } catch (error) {
      console.error("Error fetching like users:", error);
    }
  };

  onMounted(fetchInitialData);

  return {
    liked,
    likeCount,
    likeUsers,
    handleLike,
    fetchLikeUsers,
  };
}
