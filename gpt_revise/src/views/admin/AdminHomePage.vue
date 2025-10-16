<!-- views/admin/AdminHomePage.vue -->
<template>
  <div class="container container-grey-background">
    <div class="row justify-content-center">
      <!-- Admin Details Card -->
      <div class="col-12 col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h4 class="text-center">Admin Details</h4>
            <div class="mb-3">
              <h6><strong>First Name:</strong> {{ userData.fname }}</h6>
              <h6><strong>Last Name:</strong> {{ userData.lname }}</h6>
              <h6><strong>Email:</strong> {{ userData.email }}</h6>
            </div>
          </div>
        </div>
      </div>

      <!-- Admin Action Buttons -->
      <div class="text-center mt-2">
        <button class="btn btn-outline-primary" @click="navigateTo('/admin-blog-management')">Manage Posts</button>
        <button class="btn btn-outline-primary" @click="navigateTo('/admin-quiz-management')">Manage Quizzes</button>
        <button class="btn btn-outline-primary" @click="navigateTo('/admin-travel-cost-management')">Manage Travel Cost</button>
      </div>

      <!-- User Management Section -->
      <div class="col-12 mt-4">
        <h3 class="text-center">Manage User Accounts</h3>
        <div class="card mt-2">
          <div class="card-body">
            <div class="mb-3">
              <div class="input-group">
                <span class="input-group-text" id="search-icon">
                  <font-awesome-icon :icon="['fas', 'search']" />
                </span>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="search-icon"
                  v-model="searchQuery"
                />
              </div>
              <div class="mt-2">
                <span>
                  {{ searchQuery.length > 0 ? `Records Found: ${filteredUsersData.length}` : `Total Records: ${allUsersData.length}` }}
                </span>
              </div>
            </div>

            <div class="table-responsive">
              <h4>Admins</h4>
              <table class="table table-bordered w-100">
                <thead>
                  <tr class="text-center">
                    <th>Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in admins" :key="user._id" class="text-center">
                    <td>{{ user.fname }} {{ user.lname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.userType }}</td>
                  </tr>
                </tbody>
              </table>

              <h4>Users</h4>
              <table class="table table-bordered w-100">
                <thead>
                  <tr class="text-center">
                    <th>Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in regularUsers" :key="user._id" class="text-center">
                    <td>{{ user.fname }} {{ user.lname }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.userType }}</td>
                    <td>
                      <font-awesome-icon
                        icon="trash"
                        class="cursor-pointer"
                        @click="deleteUser(user._id, user.fname)"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
    <br /><br />
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "AdminHomePage",
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  components: {
    FontAwesomeIcon,
  },
  setup(props) {
    const router = useRouter();
    const allUsersData = ref([]);
    const filteredUsersData = ref([]);
    const searchQuery = ref("");

    const fetchAllUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getAllUser", {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        allUsersData.value = response.data.data;
        filteredUsersData.value = response.data.data;
      } catch (error) {
        console.error("Error fetching all user data:", error);
      }
    };

    const deleteUser = async (id, name) => {
      if (window.confirm(`Are you sure you want to delete ${name}?`)) {
        try {
          const response = await axios.post(
            "http://localhost:3000/deleteUser",
            { userid: id },
            {
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
          alert(response.data.data);
          fetchAllUserData();
        } catch (error) {
          console.error("Error deleting user:", error);
        }
      }
    };

    const navigateTo = (path) => {
      router.push(path);
    };

    watch([searchQuery, allUsersData], () => {
      if (searchQuery.value) {
        filteredUsersData.value = allUsersData.value.filter((user) =>
          `${user.fname} ${user.email}`
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase())
        );
      } else {
        filteredUsersData.value = allUsersData.value;
      }
    });

    const admins = computed(() =>
      filteredUsersData.value.filter((user) => user.userType === "admin")
    );
    const regularUsers = computed(() =>
      filteredUsersData.value.filter((user) => user.userType !== "admin")
    );

    onMounted(() => {
      fetchAllUserData();
    });

    return {
      allUsersData,
      filteredUsersData,
      searchQuery,
      deleteUser,
      navigateTo,
      admins,
      regularUsers,
    };
  },
};
</script>

<style scoped>
.container-grey-background {
  /* background-color: #dad7cf; Light grey background */
  background-color: #d6d7fc;

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
