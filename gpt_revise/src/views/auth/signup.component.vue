<template>
  <div class="auth-page">
    <div class="auth-card">
      <form @submit.prevent="handleSubmit">
        <h3 class="text-center mb-4">Sign Up</h3>

        <!-- First Name -->
        <div class="mb-3 input-group">
          <span class="input-group-text">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="First name"
            v-model="fname"
            required
          />
        </div>

        <!-- Last Name -->
        <div class="mb-3 input-group">
          <span class="input-group-text">
            <font-awesome-icon :icon="['fas', 'user']" />
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            v-model="lname"
            required
          />
        </div>

        <!-- Email -->
        <div class="mb-3 input-group">
          <span class="input-group-text">
            <font-awesome-icon :icon="['fas', 'envelope']" />
          </span>
          <input
            type="email"
            class="form-control"
            placeholder="Enter email"
            v-model="email"
            required
          />
        </div>

        <!-- Password -->
        <div class="mb-3 input-group">
          <span class="input-group-text">
            <font-awesome-icon :icon="['fas', 'lock']" />
          </span>
          <input
            type="password"
            class="form-control"
            placeholder="Enter password"
            v-model="password"
            required
          />
        </div>

        <!-- Submit -->
        <div class="d-grid">
          <button class="btn btn-primary" type="submit">Sign Up</button>
        </div>

        <!-- Login Link -->
        <p class="forgot-password text-right mt-2">
          Already registered?
          <router-link to="/sign-in">Sign in</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/services/api";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "SignUp",
  components: { FontAwesomeIcon },
  setup() {
    const fname = ref("");
    const lname = ref("");
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const handleSubmit = async () => {
      if (!fname.value || !lname.value || !email.value || !password.value) {
        alert("All fields are required");
        return;
      }

      if (!/@gmail\.com$/.test(email.value)) {
        alert("Email must be a Gmail address (example@gmail.com)");
        return;
      }

      try {
        const response = await api.post("/auth/register", {
          name: `${fname.value} ${lname.value}`, // ✅ backend expects 'name'
          email: email.value,
          password: password.value,
        });

        // ✅ successful registration returns token + user
        if (response.data.token) {
          alert("Registration successful!");
          router.push("/sign-in");
        } else {
          alert(response.data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        alert(error.response?.data?.message || "Registration failed. Please try again.");
      }
    };

    return { fname, lname, email, password, handleSubmit };
  },
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e2e6ff, #f3f6ff);
  padding: 2rem;
}

.auth-card {
  background: #fff;
  padding: 3rem 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
  width: 500px;
  max-width: 100%;
  transition: all 0.3s ease;
  margin: 0 20rem;
}

.auth-card form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.auth-card button {
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;
}

.auth-card button:hover {
  background: #1e4fd6;
}

.auth-card p {
  text-align: center;
  margin-top: 1rem;
}
</style>
