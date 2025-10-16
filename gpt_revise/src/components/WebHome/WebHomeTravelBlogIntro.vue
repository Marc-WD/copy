<template>
  <div class="container intro-container">
    <div class="row no-gutters">
      <!-- Left Image Grid -->
      <div class="col-lg-6 mb-4 mb-lg-0">
        <div class="row no-gutters">
          <div class="col-6 p-1">
            <img
              :src="travel1"
              class="img-fluid mb-3 intro-image fixed-dimensions"
              alt="Travel 1"
            />
          </div>
          <div class="col-6 p-1">
            <img
              :src="travel2"
              class="img-fluid mb-3 intro-image fixed-dimensions"
              alt="Travel 2"
            />
          </div>
        </div>
        <div class="row no-gutters">
          <div class="col-6 p-1">
            <img
              :src="travel3"
              class="img-fluid mb-3 intro-image fixed-dimensions"
              alt="Travel 3"
            />
          </div>
          <div class="col-6 p-1">
            <img
              :src="travel4"
              class="img-fluid mb-3 intro-image fixed-dimensions"
              alt="Travel 4"
            />
          </div>
        </div>
      </div>

      <!-- Right Text Section -->
      <div class="col-lg-6 d-flex flex-column justify-content-center">
        <div class="intro-text text-center text-lg-left">
          <h2 class="intro-title">
            Wanderlusting: Share Your Travels, Inspire Others
          </h2>
          <p class="intro-paragraph">
            Welcome to Wanderlust Unleashed, your one-stop shop for all things
            travel! Whether you're a seasoned explorer or a first-time
            adventurer, this platform is designed to ignite your travel dreams.
            Share your travel experiences through engaging blog posts,
            captivating photos, and insightful reviews. Dive into a world of
            diverse destinations, hidden gems, and practical tips from fellow
            travel enthusiasts. Let's embark on a journey together, one
            adventure at a time!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import travel1 from "@/assets/travel1.jpg";
import travel2 from "@/assets/travel2.jpg";
import travel3 from "@/assets/travel3.jpg";
import travel4 from "@/assets/travel4.jpg";
</script>

<style scoped>
.intro-container {
  margin-top: 40px;
  margin-bottom: 40px;
  background-color: #f5f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.no-gutters {
  margin-right: 0;
  margin-left: 0;
}

.no-gutters > .col,
.no-gutters > [class*="col-"] {
  padding-right: 0;
  padding-left: 0;
}

.p-1 {
  padding: 0.25rem !important;
}

.intro-image {
  border-radius: 8px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.intro-image:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.fixed-dimensions {
  height: 180px !important; /* Fixed height */
  width: 100% !important; /* Full width of container */
  object-fit: cover !important; /* Maintain aspect ratio, crop as needed */
}

.intro-text {
  padding: 20px;
}

.intro-title {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.intro-paragraph {
  font-size: 1.1em;
  line-height: 1.6;
  color: #555;
}
</style>
