<!-- views/admin/AdminQuizManagement.vue -->
<template>
  <div class="container quiz-management">
    <h2 class="text-center my-4">Quiz Management</h2>

    <!-- Create/Edit Quiz Card -->
    <div class="card mb-4">
      <div class="card-body">
        <h3 class="card-title">{{ editingQuiz ? "Edit Quiz" : "Create New Quiz" }}</h3>

        <div class="form-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Quiz Title"
            v-model="newQuiz.title"
          />
        </div>

        <div v-for="(question, questionIndex) in newQuiz.questions" :key="questionIndex" class="mb-3">
          <div class="form-group mb-2">
            <input
              type="text"
              class="form-control"
              placeholder="Question"
              v-model="question.question"
            />
          </div>

          <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="form-group mb-2">
            <input
              type="text"
              class="form-control"
              :placeholder="`Option ${optionIndex + 1}`"
              v-model="question.options[optionIndex]"
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Correct Answer"
              v-model="question.correctAnswer"
            />
          </div>
        </div>

        <div class="mb-3">
          <button class="btn btn-secondary" @click="addQuestion">Add Question</button>
        </div>

        <button
          class="btn"
          :class="editingQuiz ? 'btn-primary' : 'btn-success'"
          @click="editingQuiz ? handleUpdateQuiz() : handleCreateQuiz()"
        >
          {{ editingQuiz ? "Update Quiz" : "Create Quiz" }}
        </button>
      </div>
    </div>

    <!-- Existing Quizzes -->
    <div>
      <h3 class="text-center mb-4">Existing Quizzes</h3>
      <ul class="list-group">
        <li
          v-for="quiz in quizzes"
          :key="quiz._id"
          class="list-group-item d-flex justify-content-between align-items-center"
        >
          <span>{{ quiz.questions[0]?.question }}</span>
          <div>
            <button class="btn btn-warning btn-sm mx-1" @click="handleEditQuiz(quiz)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="handleDeleteQuiz(quiz._id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "AdminQuizManagement",
  setup() {
    const quizzes = ref([]);
    const editingQuiz = ref(null);
    const newQuiz = ref({
      title: "",
      questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
    });

    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/quizzes");
        quizzes.value = response.data;
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    const addQuestion = () => {
      newQuiz.value.questions.push({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    };

    const handleQuizChange = (questionIndex, optionIndex = null, value, field = null) => {
      if (optionIndex === null) {
        newQuiz.value.questions[questionIndex][field] = value;
      } else {
        newQuiz.value.questions[questionIndex].options[optionIndex] = value;
      }
    };

    const handleCreateQuiz = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/quizzes", newQuiz.value);
        quizzes.value.push(response.data);
        resetQuizForm();
      } catch (error) {
        console.error("Error creating quiz:", error);
      }
    };

    const handleEditQuiz = (quiz) => {
      editingQuiz.value = quiz._id;
      newQuiz.value = {
        title: quiz.title,
        questions: quiz.questions,
      };
    };

    const handleUpdateQuiz = async () => {
      try {
        const response = await axios.put(`http://localhost:3000/api/quizzes/${editingQuiz.value}`, newQuiz.value);
        quizzes.value = quizzes.value.map((quiz) => (quiz._id === editingQuiz.value ? response.data : quiz));
        resetQuizForm();
        editingQuiz.value = null;
      } catch (error) {
        console.error("Error updating quiz:", error);
      }
    };

    const handleDeleteQuiz = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/quizzes/${id}`);
        quizzes.value = quizzes.value.filter((quiz) => quiz._id !== id);
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    };

    const resetQuizForm = () => {
      newQuiz.value = {
        title: "",
        questions: [{ question: "", options: ["", "", "", ""], correctAnswer: "" }],
      };
      editingQuiz.value = null;
    };

    onMounted(() => {
      fetchQuizzes();
    });

    return {
      quizzes,
      newQuiz,
      editingQuiz,
      addQuestion,
      handleCreateQuiz,
      handleEditQuiz,
      handleUpdateQuiz,
      handleDeleteQuiz,
      handleQuizChange,
    };
  },
};
</script>

<style scoped>
.quiz-management {
  max-width: 800px;
  margin: 0 auto;
}

.card-title {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.list-group-item {
  margin-bottom: 10px;
}

</style>
