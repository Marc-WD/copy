<!-- views/admin/TravelCostManagement.vue -->
<template>
  <div class="budget-planner-container">
    <h2>{{ isEditing ? "Edit City Details" : "Add City Details" }}</h2>

    <label>Country:</label>
    <input type="text" v-model="country" class="form-control" />

    <label>City Name:</label>
    <input type="text" v-model="cityName" class="form-control" />

    <hr />

    <!-- Transportation Section -->
    <div class="card mb-3">
      <div class="card-header">
        <h3>Transportation</h3>
      </div>
      <div class="card-body">
        <div
          v-for="(trans, index) in transportation"
          :key="index"
          class="input-group mb-2"
        >
          <input
            type="text"
            v-model="trans.mode"
            placeholder="Mode"
            class="form-control"
          />
          <input
            type="number"
            v-model.number="trans.price"
            placeholder="Price"
            class="form-control"
          />
        </div>
        <button class="btn btn-primary" @click="addTransportation">
          Add Transportation
        </button>
      </div>
    </div>

    <hr />

    <!-- Accommodations Section -->
    <div class="card mb-3">
      <div class="card-header">
        <h3>Accommodations</h3>
      </div>
      <div class="card-body">
        <div
          v-for="(acc, index) in accommodations"
          :key="index"
          class="input-group mb-2"
        >
          <input
            type="number"
            v-model.number="acc.stars"
            placeholder="Stars"
            min="1"
            max="5"
            class="form-control"
          />
          <input
            type="number"
            v-model.number="acc.pricePerNight"
            placeholder="Price Per Night"
            class="form-control"
          />
        </div>
        <button class="btn btn-primary" @click="addAccommodation">
          Add Accommodation
        </button>
      </div>
    </div>

    <hr />

    <!-- Foods Section -->
    <div class="card mb-3">
      <div class="card-header">
        <h3>Foods</h3>
      </div>
      <div class="card-body">
        <div
          v-for="(food, index) in foods"
          :key="index"
          class="input-group mb-2"
        >
          <input
            type="text"
            v-model="food.type"
            placeholder="Type"
            class="form-control"
          />
          <input
            type="number"
            v-model.number="food.pricePerMeal"
            placeholder="Price Per Meal"
            class="form-control"
          />
        </div>
        <button class="btn btn-primary" @click="addFood">
          Add Food
        </button>
      </div>
    </div>

    <hr />
    <button class="btn btn-success" @click="handleSaveCity">
      {{ isEditing ? "Update City" : "Add City" }}
    </button>

    <hr />
    <h3>Existing Cities</h3>
    <div class="card">
      <ul class="list-group list-group-flush">
        <li
          v-for="city in cities"
          :key="city._id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{{ city.name }}, {{ city.country }}</span>
          <div class="city-buttons">
            <button
              class="btn btn-warning btn-sm mr-2"
              @click="handleEditCity(city)"
            >
              Edit
            </button>
            <button
              class="btn btn-danger btn-sm"
              @click="handleDeleteCity(city._id)"
            >
              Delete
            </button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";

export default {
  name: "TravelCostManagement",
  setup() {
    const cityName = ref("");
    const country = ref("");
    const transportation = ref([]);
    const accommodations = ref([]);
    const foods = ref([]);
    const cities = ref([]);
    const isEditing = ref(false);
    const editCityId = ref(null);

    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/budgetCalculator"
        );
        cities.value = response.data;
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const resetForm = () => {
      cityName.value = "";
      country.value = "";
      transportation.value = [];
      accommodations.value = [];
      foods.value = [];
    };

    const handleAddCity = async () => {
      try {
        await axios.post("http://localhost:3000/api/budgetCalculator", {
          name: cityName.value,
          country: country.value,
          transportation: transportation.value,
          accommodations: accommodations.value,
          foods: foods.value,
        });
        alert("City added successfully");
        resetForm();
        fetchCities();
      } catch (error) {
        console.error("Error adding city:", error);
      }
    };

    const handleSaveCity = async () => {
      if (isEditing.value) {
        try {
          await axios.put(
            `http://localhost:3000/api/budgetCalculator/${editCityId.value}`,
            {
              name: cityName.value,
              country: country.value,
              transportation: transportation.value,
              accommodations: accommodations.value,
              foods: foods.value,
            }
          );
          alert("City updated successfully");
          isEditing.value = false;
          editCityId.value = null;
          resetForm();
        } catch (error) {
          console.error("Error updating city:", error);
        }
      } else {
        handleAddCity();
      }
      fetchCities();
    };

    const handleDeleteCity = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/budgetCalculator/${id}`);
        alert("City deleted successfully");
        fetchCities();
      } catch (error) {
        console.error("Error deleting city:", error);
      }
    };

    const handleEditCity = (city) => {
      isEditing.value = true;
      editCityId.value = city._id;
      cityName.value = city.name;
      country.value = city.country;
      transportation.value = city.transportation;
      accommodations.value = city.accommodations;
      foods.value = city.foods;
    };

    const addTransportation = () => {
      transportation.value.push({ mode: "", price: 0 });
    };

    const addAccommodation = () => {
      accommodations.value.push({ stars: 0, pricePerNight: 0 });
    };

    const addFood = () => {
      foods.value.push({ type: "", pricePerMeal: 0 });
    };

    onMounted(() => {
      fetchCities();
    });

    return {
      cityName,
      country,
      transportation,
      accommodations,
      foods,
      cities,
      isEditing,
      handleSaveCity,
      handleDeleteCity,
      handleEditCity,
      addTransportation,
      addAccommodation,
      addFood,
    };
  },
};
</script>

<style scoped>
.budget-planner-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.budget-planner-container h2,
.budget-planner-container h3 {
  text-align: center;
  margin-bottom: 8px;
}

.budget-planner-container .form-control {
  margin-bottom: 10px;
}

.budget-planner-container .card {
  margin-bottom: 10px;
}

.budget-planner-container .card-header {
  background-color: #3ca04d;
  color: white;
  padding: 5px;
  border-radius: 4px 4px 0 0;
}

.budget-planner-container .card-body {
  padding: 20px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 0 0 4px 4px;
}

.budget-planner-container .input-group {
  display: flex;
  gap: 10px;
}

.budget-planner-container .btn {
  margin-top: 10px;
}

.budget-planner-container .city-buttons {
  display: flex;
  gap: 10px;
}

.budget-planner-container .list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border: 1px solid #ddd;
}

.budget-planner-container .list-group-item span {
  font-weight: bold;
}

.budget-planner-container .list-group-item .btn {
  padding: 5px 10px;
}

</style>
