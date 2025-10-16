<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <RouterLink class="navbar-brand" to="/">
      <img src="@/assets/WebLogo.jpeg" class="d-inline-block align-top" alt="Logo" />
      <span>TravelTrove doy</span>
    </RouterLink>

    <button class="navbar-toggler" type="button" @click="toggleMenu">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div :class="['collapse', 'navbar-collapse', { show: isMenuOpen }]" id="navbarNav">
      <ul class="navbar-nav mx-auto">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/blog-post-home">Blog</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/user-admin-details">User Details</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/explore">Explore</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/about">About us</RouterLink>
        </li>

        <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </ul>

      <ul class="navbar-nav ml-auto">
        <template v-if="isLoggedIn">
          <form class="d-flex">
            <button class="btn btn-outline-danger" type="button" @click="handleLogout">
              Logout
            </button>
          </form>
        </template>
        <template v-else>
          <form class="d-flex">
            <button class="btn btn-outline-primary me-2" @click.prevent="goTo('/sign-in')">
              Login
            </button>
            <button class="btn btn-outline-success" @click.prevent="goTo('/sign-up')">
              Signup
            </button>
          </form>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'

const isMenuOpen = ref(false)
const { state, logout } = useAuth()
const isLoggedIn = computed(() => !!state.token)
const router = useRouter()

onMounted(() => {
  // ensure legacy flag exists
  if (!window.localStorage.getItem('loggedin')) {
    window.localStorage.setItem('loggedin', state.token ? 'true' : 'false')
  }
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = () => {
  try { logout(); } catch(e) { window.localStorage.removeItem('token'); window.localStorage.removeItem('user'); window.localStorage.setItem('loggedin','false'); }
  router.push('/sign-in')
}

const goTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.navbar-brand img {
  width: 90px; /* Adjust the width as needed */
  height: 50px; /* Adjust the height as needed */
  border-radius: 2px;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-brand span {
  font-size: 1.5rem; /* Adjust the font size as needed */
  font-weight: bold; /* Make the text bold */
  color: #333; /* Adjust the color as needed */
  margin-left: 10px; /* Add space between the logo and the text */
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background-color: #007bff;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  font-size: 24px;
  font-weight: bold;
}

.navbar-links {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.navbar-links li {
  margin-left: 20px;
}

.navbar-links a {
  color: #fff;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.navbar-links a:hover {
  color: #ffeb3b;
}

</style>
