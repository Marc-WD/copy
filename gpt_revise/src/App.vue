<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div id="app" class="app-container">
    <!-- ✅ Global Navbar -->
    <Navbar />

    <!-- ✅ Router View with transition -->
    <main class="main-content">
      <transition name="fade" mode="out-in">
        <RouterView />
      </transition>
    </main>

    <!-- ✅ Global Footer -->
    <Footer />
  </div>
</template>

<style>
/* 🌐 Global app layout */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Inter', 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  margin: 0;
  padding: 0;
}

/* ✅ Main content grows between Navbar and Footer */
.main-content {
  flex: 1;
  padding-top: 60px; /* Adjust if Navbar is fixed */
  padding-bottom: 40px;
}

/* ✨ Smooth page transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Optional: scrollbar cleanup for aesthetics */
body {
  margin: 0;
  overflow-x: hidden;
}
</style>
