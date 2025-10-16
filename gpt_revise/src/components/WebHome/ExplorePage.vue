<template>
  <div class="explore-page container">
    <h1>Explore</h1>

    <div class="section">
      <Quiz />
    </div>

    <div class="section">
      <BudgetPlanner />
    </div>

    <div class="section">
      <Poll />
    </div>
  </div>
</template>

<script setup>
import Quiz from "./Quiz.vue";
import BudgetPlanner from "./BudgetPlanner.vue";
import Poll from "./Poll.vue";
</script>

<style scoped>
.explore-page {
    margin-top: 20px;
  }
  
  .explore-page .section {
    margin-bottom: 40px;
  }
  
  .explore-page .section h2 {
    margin-bottom: 20px;
  }
  
  .explore-page .form-control {
    margin-bottom: 10px;
  }

</style>
