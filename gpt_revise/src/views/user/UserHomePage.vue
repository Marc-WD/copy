<template>
  <div class="container container-grey-background">
    <div class="row justify-content-center">
      <div class="col-12 col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h4 class="m-0">User Information</h4>
              <div
                class="edit-icon d-flex align-items-center"
                style="cursor: pointer"
                @click="goToEditUser"
              >
                <i class="fa fa-pen me-1"></i>
                <span class="edit-label">Edit</span>
              </div>
            </div>
            <div class="user-details">
              <h6><strong>First Name:</strong> {{ user.fname }}</h6>
              <h6><strong>Last Name:</strong> {{ user.lname }}</h6>
              <h6><strong>Email:</strong> {{ user.email }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-2">
      <button class="btn btn-outline-primary" @click="goToAddBlogPost">
        Add Blog Post
      </button>
    </div>

    <div class="mt-4">
      <h3 class="text-center">Your Blog Posts</h3>
      <div class="row mt-2">
        <template v-if="userPosts.length > 0">
          <UserBlogCard
            v-for="(post, index) in userPosts"
            :key="index"
            :img="`http://localhost:3000/uploads/${post.image}`"
            :title="post.title"
            :description="post.description"
            :createdAt="post.createdAt"
            :showActions="true"
            :showReadMore="true"
            @edit="handleEdit(post)"
            @delete="handleDelete(post._id)"
          />
        </template>
        <p v-else>No posts found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import UserBlogCard from "@/views/user/UserBlogCard.vue";

const router = useRouter();

const user = ref(null);
const userPosts = ref([]);

const fetchUserData = async () => {
  try {
    const response = await axios.post("http://localhost:3000/userdata", {
      token: window.localStorage.getItem("token"),
    });

    user.value = response.data.data;
    fetchUserPosts(user.value._id);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const fetchUserPosts = async (userId) => {
  try {
    const result = await axios.get(`http://localhost:3000/user-blogs/${userId}`);
    userPosts.value = result.data.data;
  } catch (error) {
    console.error("Error fetching user posts:", error);
  }
};

const goToEditUser = () => {
  router.push({
    name: "EditUserData",
    params: {
      data: {
        _id: user.value._id,
        fname: user.value.fname,
        lname: user.value.lname,
        email: user.value.email,
      },
    },
  });
};

const goToAddBlogPost = () => {
  router.push("/add-blog-post");
};

const handleEdit = (post) => {
  router.push({
    path: "/add-blog-post",
    query: { postId: post._id },
    state: { post },
  });
};

const handleDelete = async (postId) => {
  try {
    await axios.post("http://localhost:3000/delete-post", { postId });
    userPosts.value = userPosts.value.filter((post) => post._id !== postId);
  } catch (error) {
    console.error("Error deleting blog post:", error);
  }
};

onMounted(fetchUserData);
</script>

<style scoped>
.container-grey-background {
  /* background-color: #dad7cf; Light grey background */
  background-color: BLACK;

  padding: 20px; /* Optional padding for aesthetics */
  margin-top: 20px; /* Adjust the value as needed */
  margin-bottom: 20px; /* Adjust the value as needed */
  /* background-image: url("../../public/background.jpg"); Replace 'path_to_your_image.jpg' with the path to your background image */
  /* background-size: cover; Ensure the background image covers the entire container */
  /* background-position: center; */
  /* background-repeat: no-repeat; */
}
/* Additional styling for the delete icon */
.table .fa-trash {
  transition: color 0.3s ease;
}

.table .fa-trash:hover {
  color: red;
}

.card {
  margin: 10px 0;
}

@media (max-width: 767.98px) {
  .admin-margin-top {
    margin-top: 20px;
  }
}

</style>
