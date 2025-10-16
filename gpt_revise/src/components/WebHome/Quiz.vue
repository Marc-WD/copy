<template>
  <div class="quiz-container">
    <!-- Start Screen -->
    <div v-if="!quizStarted" class="start-quiz">
      <button @click="startQuiz" class="btn btn-primary">
        Test Your Knowledge about Travelling
      </button>
    </div>

    <!-- Loading State -->
    <div v-else-if="loading" class="loading">Loading quizzes...</div>

    <!-- Error State -->
    <div v-else-if="error" class="error">Error: {{ error }}</div>

    <!-- Results -->
    <div v-else-if="showResults" class="quiz-results">
      <h2>
        Your Score: {{ totalScore }} /
        {{ totalQuestions }}
      </h2>
      <button @click="handleRetry" class="btn btn-primary">Retry Quiz</button>
    </div>

    <!-- Quiz Content -->
    <div v-else class="quiz">
      <h2>{{ currentQuiz.title }}</h2>

      <div
        v-for="(question, qIndex) in currentQuiz.questions"
        :key="question._id || qIndex"
        class="question-card"
      >
        <h3>{{ question.question }}</h3>

        <div
          v-for="(option, optionIndex) in question.options"
          :key="optionIndex"
          class="option"
        >
          <input
            type="radio"
            :name="`question-${question._id || qIndex}`"
            :value="option"
            :checked="selectedOptions[question._id] === option"
            @change="() => handleOptionChange(question._id, option)"
          />
          <label>{{ option }}</label>
        </div>
      </div>

      <!-- Navigation -->
      <div class="navigation">
        <button
          v-if="currentQuizIndex > 0"
          @click="currentQuizIndex--"
          class="btn btn-secondary"
        >
          Previous
        </button>

        <button
          v-if="currentQuizIndex < quizzes.length - 1"
          @click="currentQuizIndex++"
          class="btn btn-secondary"
        >
          Next
        </button>

        <button
          v-else
          @click="handleSubmit"
          class="btn btn-primary"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import axios from "axios";

// State
const quizzes = ref([]);
const currentQuizIndex = ref(0);
const selectedOptions = reactive({});
const totalScore = ref(0);
const showResults = ref(false);
const loading = ref(true);
const error = ref(null);
const quizStarted = ref(false);

// Computed for current quiz
const currentQuiz = computed(() => quizzes.value[currentQuizIndex.value]);
const totalQuestions = computed(() =>
  quizzes.value.reduce((acc, quiz) => acc + quiz.questions.length, 0)
);

// Methods
const fetchQuizzes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/quizzes");
    quizzes.value = response.data;
    loading.value = false;
  } catch (err) {
    error.value = err.message || "Failed to fetch quizzes.";
    loading.value = false;
  }
};

const handleOptionChange = (questionId, option) => {
  selectedOptions[questionId] = option;
};

const handleSubmit = () => {
  let score = 0;

  quizzes.value.forEach((quiz) => {
    quiz.questions.forEach((question) => {
      const selected = selectedOptions[question._id];
      if (selected && selected === question.correctAnswer) {
        score += 1;
      }
    });
  });

  totalScore.value = score;
  showResults.value = true;
};

const handleRetry = () => {
  Object.keys(selectedOptions).forEach((key) => delete selectedOptions[key]);
  showResults.value = false;
  currentQuizIndex.value = 0;
  totalScore.value = 0;
};

const startQuiz = async () => {
  quizStarted.value = true;
  await fetchQuizzes();
};
</script>

<style scoped>
.quiz-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.start-quiz {
  text-align: center;
  margin-top: 50px;
}

.loading,
.error,
.quiz-results {
  text-align: center;
  margin-top: 20px;
}

.question-card {
  margin-bottom: 20px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
}

.option {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.option input {
  margin-right: 10px;
}

.navigation {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
}
</style>
