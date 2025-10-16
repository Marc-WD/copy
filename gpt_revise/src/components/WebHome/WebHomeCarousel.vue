<template>
  <div
    id="carouselExampleAutoplaying"
    class="carousel slide carousel-fade"
    data-bs-ride="carousel"
  >
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img :src="pic1" class="d-block w-100" alt="First slide" />
        <div class="carousel-caption">
          <button @click="handleStartExplore" class="explore-button">
            START EXPLORE
          </button>
        </div>
      </div>

      <div class="carousel-item">
        <img :src="pic2" class="d-block w-100" alt="Second slide" />
        <div class="carousel-caption">
          <button @click="handleStartExplore" class="explore-button">
            START EXPLORE
          </button>
        </div>
      </div>

      <div class="carousel-item">
        <img :src="pic3" class="d-block w-100" alt="Third slide" />
        <div class="carousel-caption">
          <button @click="handleStartExplore" class="explore-button">
            START EXPLORE
          </button>
        </div>
      </div>
    </div>

    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleAutoplaying"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>

    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleAutoplaying"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import pic1 from "@/assets/pic_1.jpg";
import pic2 from "@/assets/pic_2.jpg";
import pic3 from "@/assets/pic_3.jpg";

const router = useRouter();

const handleStartExplore = () => {
  router.push("/explore");
};

onMounted(() => {
  const carouselElement = document.getElementById("carouselExampleAutoplaying");
  if (window.bootstrap && window.bootstrap.Carousel) {
    const carouselInstance = new window.bootstrap.Carousel(carouselElement, {
      interval: 100,
      ride: "carousel",
      pause: false,
    });
    carouselInstance.cycle();
  }
});
</script>

<style scoped>
/* Card.css */
.carousel {
  height: 750px; /* Set your desired height */
  width: 100%; /* Ensure it takes full width */
  margin: auto; /* Center the carousel */
  position: relative;
}

.carousel-inner {
  width: 100%;
  height: 100%;
}

.carousel-item {
  height: 100%; /* Ensure each item takes full height */
}

.carousel-item img {
  width: 100%;
  height: 81%;
  object-fit: cover; /* Ensure image covers the container without stretching */
}

.carousel-caption {
  position: absolute;
  bottom: 160px; /* Position button at the bottom */
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Ensure visibility */
}

.explore-button {
  background-color: lightcoral;
  color: white;
  font-size: 22px;
  font: bolder;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  z-index: 9999;
  display: inline-block; /* Ensure it is an inline-block element */
}

.explore-button:hover {
  background-color: #ff7f50;
  color: white;
}

.carousel-caption {
  background-color: transparent;
}

</style>
