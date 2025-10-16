import { reactive } from "vue";

const state = reactive({
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
});

export function useAuth() {
  // set login info
  const setAuth = (token, user) => {
    state.token = token;
    state.user = user;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  // logout
  const logout = () => {
    state.token = null;
    state.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return {
    state,
    setAuth,
    logout,
  };
}
