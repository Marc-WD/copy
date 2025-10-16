<template>
  <div class="overlay-container">
    <div class="container position-relative p-0">
      <div class="row no-gutters">
        <div class="col-md-4 p-0">
          <img
            :src="img1"
            class="img-fluid overlay-image"
            alt="Landscape 1"
          />
        </div>
        <div class="col-md-4 p-0">
          <img
            :src="img2"
            class="img-fluid overlay-image"
            alt="Landscape 2"
          />
        </div>
        <div class="col-md-4 p-0">
          <img
            :src="img3"
            class="img-fluid overlay-image"
            alt="Landscape 3"
          />
        </div>
      </div>

      <div class="overlay-text">
        <h2>FEATURED POST</h2>
        <p>
          Explore the beautiful landscapes of Istanbul with us and Enjoy !!!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import img1 from "@/assets/Overlays1.jpg";
import img2 from "@/assets/Overlays2.jpg";
import img3 from "@/assets/Overlays3.jpg";
</script>

<style scoped>
.overlay-container {
  margin-top: -90px;
  position: relative;
}

.row.no-gutters {
  margin-right: 0;
  margin-left: 0;
}

.row.no-gutters > .col-md-4 {
  padding-right: 0;
  padding-left: 0;
}

.overlay-image {
  height: 250px !important;
  width: 100% !important;
  object-fit: cover;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  border-radius: 5px; /* Add a slight border-radius for a smoother look */
}

.overlay-image:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.overlay-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-align: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5); /* Add a semi-transparent background */
  border-radius: 10px;
  z-index: 1;
  width: 80%;
  max-width: 600px; /* Limit the width for better readability */
}

.overlay-text h2 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.overlay-text p {
  font-size: 1.2em;
  margin: 0;
}
</style>
