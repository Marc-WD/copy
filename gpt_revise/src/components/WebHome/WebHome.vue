<template>
  <div>
    <Carousel />

    <br />

    <OverlaysImage
      :img1="Overlays1"
      :img2="Overlays2"
      :img3="Overlays3"
    />

    <br />

    <TravelBlogIntro />

    <br />

    <TopLikedPosts />

    <br />
  </div>
</template>

<script setup>
import Carousel from "@/components/WebHome/WebHomeCarousel.vue";
import OverlaysImage from "@/components/WebHome/WebHomeOverlaysImage.vue";
import TravelBlogIntro from "@/components/WebHome/WebHomeTravelBlogIntro.vue";
import TopLikedPosts from "@/components/WebHome/TopLikedPosts.vue";

import Overlays1 from "@/assets/Overlays1.jpg";
import Overlays2 from "@/assets/Overlays2.jpg";
import Overlays3 from "@/assets/Overlays3.jpg";
</script>

<style scoped>
/* Add any local styles if needed */
</style>
