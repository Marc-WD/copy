<template>
  <div class="container container-grey-background">
    <h2>{{ editingPost ? "Edit Blog Post" : "Add Blog Post" }}</h2>

    <form @submit.prevent="submitImage">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          type="text"
          id="title"
          class="form-control"
          v-model="title"
          required
        />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          class="form-control"
          rows="3"
          v-model="description"
          required
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="image" class="form-label">Image</label>
        <input
          type="file"
          id="image"
          class="form-control"
          @change="onInputChange"
          :required="!editingPost"
        />
      </div>

      <button type="submit" class="btn btn-primary">
        {{ editingPost ? "Update" : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "AddBlogPost",
  async setup() {
    const title = ref("");
    const description = ref("");
    const image = ref(null);
    const userId = ref(null);
    const editingPost = ref(null);

    const router = useRouter();
    const route = useRoute();

    // ✅ Fetch logged in user info
    onMounted(async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        userId.value = response.data._id;

        // ✅ If editing existing post
        if (route.params.post || route.query.edit) {
          const post = route.params.post || JSON.parse(route.query.edit);
          editingPost.value = post;
          title.value = post.title;
          description.value = post.description;
        }
      } catch (error) {
        console.error("Error verifying user:", error);
      }
    });

    // ✅ Upload or update a post
    const submitImage = async () => {
      try {
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("description", description.value);
        formData.append("userId", userId.value);
        if (image.value) formData.append("image", image.value);

        const token = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        };

        if (editingPost.value) {
          await axios.put(
            `http://localhost:5000/api/blogs/${editingPost.value._id}`,
            formData,
            { headers }
          );
          alert("Post updated successfully!");
        } else {
          await axios.post(
            "http://localhost:5000/api/blogs",
            formData,
            { headers }
          );
          alert("Post created successfully!");
        }

        router.push("/user-home-page");
      } catch (error) {
        console.error("Error uploading post:", error);
        alert("Error uploading post");
      }
    };

    const onInputChange = (e) => {
      image.value = e.target.files[0];
    };

    return {
      title,
      description,
      image,
      userId,
      editingPost,
      submitImage,
      onInputChange,
    };
  },
};
</script>
