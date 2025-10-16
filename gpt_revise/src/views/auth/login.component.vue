<template>
  <div class="auth-page">
    <div class="auth-card">
      <form @submit.prevent="handleLogin">
        <h3 class="text-center mb-4">Sign In</h3>

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
          <button class="btn btn-primary" type="submit">Login</button>
        </div>

        <!-- Register Link -->
        <p class="forgot-password text-right mt-2">
          Don't have an account?
          <router-link to="/sign-up">Sign up</router-link>
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
// ✅ add this line
import { useAuth } from "@/stores/auth";

export default {
  name: "SignIn",
  components: { FontAwesomeIcon },
  setup() {
    const email = ref("");
    const password = ref("");
    const router = useRouter();

    const { setAuth } = useAuth();

    const handleLogin = async () => {
      if (!email.value || !password.value) {
        alert("Please enter your email and password");
        return;
      }

      try {
        const res = await api.post("/auth/login", {
          email: email.value,
          password: password.value,
        });

        if (res.data.token) {
          // ✅ Save token and user info to localStorage for persistence
          const { setAuth } = useAuth();
          setAuth(res.data.token, res.data.user);

          // ✅ update reactive auth state
          try {
            setAuth(res.data.token, res.data.user);
          } catch (e) {}

          // legacy flag used by Navbar
          localStorage.setItem("loggedin", "true");

          alert("Login successful!");
          router.push("/"); // redirect to homepage or dashboard
        } else {
          alert(res.data.message || "Invalid credentials");
        }
      } catch (err) {
        console.error("Login error:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Login failed. Check credentials.");
      }
    };

    return { email, password, handleLogin };
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
