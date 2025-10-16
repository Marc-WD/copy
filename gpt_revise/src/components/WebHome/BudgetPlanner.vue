<template>
  <div class="budget-planner container">
    <h2>Travel Budget Planner</h2>

    <div class="row">
      <div class="col-md-6 mb-3">
        <label>City:</label>
        <select class="form-control" v-model="selectedCity">
          <option value="">Select City</option>
          <option v-for="city in cities" :key="city._id" :value="city.name">
            {{ city.name }}
          </option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label>Mode of Transportation:</label>
        <select class="form-control" v-model="transportationMode">
          <option value="">Select Mode</option>
          <option
            v-for="(transport, index) in currentCity?.transportation || []"
            :key="index"
            :value="transport.mode"
          >
            {{ transport.mode }}
          </option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label>Hotel Rating:</label>
        <select class="form-control" v-model="hotelRating">
          <option v-for="n in 5" :key="n" :value="n">{{ n }} Star</option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label>Number of Rooms:</label>
        <input
          type="number"
          class="form-control"
          v-model.number="numberOfRooms"
          min="1"
        />
      </div>

      <div class="col-md-6 mb-3">
        <label>Food Type:</label>
        <select class="form-control" v-model="foodType">
          <option value="">Select Food Type</option>
          <option
            v-for="(food, index) in currentCity?.foods || []"
            :key="index"
            :value="food.type"
          >
            {{ food.type }}
          </option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label>Number of Persons:</label>
        <input
          type="number"
          class="form-control"
          v-model.number="numberOfPersons"
          min="1"
        />
      </div>

      <div class="col-md-6 mb-3">
        <label>Number of Days:</label>
        <input
          type="number"
          class="form-control"
          v-model.number="numberOfDays"
          min="1"
        />
      </div>
    </div>

    <div class="estimated-cost mt-4 text-center">
      <h3>Total Cost: ${{ totalCost.toFixed(2) }}</h3>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";

const cities = ref([]);
const selectedCity = ref("");
const transportationMode = ref("");
const hotelRating = ref(1);
const foodType = ref("");
const numberOfPersons = ref(1);
const numberOfRooms = ref(1);
const numberOfDays = ref(1);
const totalCost = ref(0);

const currentCity = computed(() =>
  cities.value.find((c) => c.name === selectedCity.value)
);

const fetchCities = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/budgetCalculator");
    cities.value = response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
  }
};

const calculateTotalCost = () => {
  const city = currentCity.value;
  if (!city) {
    totalCost.value = 0;
    return;
  }

  const transportation = city.transportation.find(
    (t) => t.mode === transportationMode.value
  );
  const accommodation = city.accommodations.find(
    (a) => a.stars === parseInt(hotelRating.value)
  );
  const food = city.foods.find((f) => f.type === foodType.value);

  if (!transportation || !accommodation || !food) {
    totalCost.value = 0;
    return;
  }

  const totalTransportationCost = transportation.price * numberOfPersons.value;
  const totalAccommodationCost =
    accommodation.pricePerNight * numberOfRooms.value * numberOfDays.value;
  const totalFoodCost = food.pricePerMeal * numberOfPersons.value * numberOfDays.value * 3;

  totalCost.value =
    totalTransportationCost + totalAccommodationCost + totalFoodCost;
};

onMounted(fetchCities);

watch(
  [
    selectedCity,
    transportationMode,
    hotelRating,
    foodType,
    numberOfPersons,
    numberOfRooms,
    numberOfDays,
  ],
  calculateTotalCost
);
</script>

<style scoped>
.budget-planner {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.budget-planner h2 {
  text-align: center;
  margin-bottom: 20px;
}

.budget-planner .row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.budget-planner .col-md-6 {
  flex: 1;
  min-width: 300px;
  margin: 10px;
}

.budget-planner label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

.budget-planner .form-control {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.budget-planner input[type="range"] {
  width: 100%;
}

.budget-planner .estimated-cost {
  text-align: center;
  margin-top: 20px;
}

.budget-planner .estimated-cost h3 {
  font-size: 24px;
  color: #28a745;
}
</style>
