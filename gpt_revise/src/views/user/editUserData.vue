<template>
  <div class="container container-grey-background">
    <h2>Edit User Data</h2>

    <form @submit.prevent="updateData">
      <div class="mb-3">
        <label for="fname" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="fname"
          v-model="fname"
        />
      </div>

      <div class="mb-3">
        <label for="lname" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lname"
          v-model="lname"
        />
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email Address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="email"
        />
      </div>

      <button type="submit" class="btn btn-primary">
        Update
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();

const fname = ref("");
const lname = ref("");
const email = ref("");
const userId = ref("");

onMounted(() => {
  const userData = route.params.data || route.query; // support both query & param usage

  if (userData) {
    console.log("Route data:", userData);
    fname.value = userData.fname || "";
    lname.value = userData.lname || "";
    email.value = userData.email || "";
    userId.value = userData._id || "";
  }
});

const updateData = async () => {
  console.log("Updated Data:", { fname: fname.value, lname: lname.value, email: email.value });

  try {
    const response = await axios.post("http://localhost:3000/updateUser", {
      id: userId.value,
      fname: fname.value,
      lname: lname.value,
      email: email.value,
    });

    console.log("Response:", response.data);
    router.push("/user-home-page");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
