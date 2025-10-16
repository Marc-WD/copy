<template>
  <div class="poll-section">
    <!-- CREATE POLL -->
    <div v-if="isAuthenticated" class="create-poll">
      <h2>Create Poll</h2>

      <input
        type="text"
        v-model="pollQuestion"
        placeholder="Poll Question"
        class="form-control"
      />

      <div v-for="(option, index) in pollOptions" :key="index">
        <input
          type="text"
          :value="option"
          readonly
          class="form-control option-input"
        />
      </div>

      <div v-if="showNewOptionInput" class="new-option">
        <input
          type="text"
          v-model="newOption"
          placeholder="New option"
          class="form-control"
        />
        <button @click="addOption" class="btn btn-secondary">Add Option</button>
      </div>

      <button
        @click="showNewOptionInput = true"
        class="btn btn-secondary mt-2"
      >
        Add Option
      </button>
      <button @click="handleCreatePoll" class="btn btn-primary mt-2">
        Create Poll
      </button>
    </div>

    <div v-else class="login-prompt">
      <h2>Login to Create a Poll</h2>
      <p>Please log in to create a poll.</p>
    </div>

    <!-- POLL VOTING SECTION -->
    <div class="vote-section">
      <h2>Vote in Polls</h2>
      <div v-for="poll in polls" :key="poll._id" class="poll">
        <h3>{{ poll.question }}</h3>

        <div
          v-for="(option, index) in poll.options"
          :key="index"
          class="option"
        >
          <input
            type="radio"
            :name="`poll-${poll._id}`"
            :value="option.option"
            v-model="votedOption"
          />
          <label>{{ option.option }}</label>
        </div>

        <button @click="handleVote(poll._id)" class="btn btn-primary">
          Vote
        </button>

        <div class="results mt-2">
          <div>Total Votes: {{ poll.totalVotes }}</div>
          <div v-for="opt in poll.options" :key="opt.option">
            {{ opt.option }}: {{ opt.votes }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

// Reactive state
const pollQuestion = ref("");
const pollOptions = ref([]);
const newOption = ref("");
const showNewOptionInput = ref(false);
const polls = ref([]);
const votedOption = ref("");
const isAuthenticated = ref(false);

onMounted(() => {
  fetchPolls();
  checkAuthentication();

  socket.on("vote", (updatedPoll) => {
    polls.value = polls.value.map((poll) =>
      poll._id === updatedPoll._id ? updatedPoll : poll
    );
  });
});

onUnmounted(() => {
  socket.off("vote");
});

const fetchPolls = async () => {
  try {
    const response = await axios.get("http://localhost:3000/polls");
    polls.value = response.data;
  } catch (error) {
    console.error("Error fetching polls:", error);
  }
};

const checkAuthentication = () => {
  const userId = localStorage.getItem("userId");
  isAuthenticated.value = !!userId;
};

const addOption = () => {
  if (newOption.value.trim() !== "") {
    pollOptions.value.push(newOption.value);
    newOption.value = "";
    showNewOptionInput.value = false;
  }
};

const handleCreatePoll = async () => {
  if (!isAuthenticated.value) {
    alert("Sign in required to create a poll.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:3000/polls", {
      question: pollQuestion.value,
      options: pollOptions.value,
    });
    polls.value.push(response.data);
    pollQuestion.value = "";
    pollOptions.value = [];
    showNewOptionInput.value = false;
  } catch (error) {
    console.error("Error creating poll:", error);
  }
};

const handleVote = async (pollId) => {
  if (!votedOption.value) {
    alert("Please select an option to vote.");
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:3000/polls/${pollId}/vote`,
      { option: votedOption.value }
    );

    const updatedPoll = response.data;
    polls.value = polls.value.map((poll) =>
      poll._id === updatedPoll._id ? updatedPoll : poll
    );

    socket.emit("vote", updatedPoll);
    votedOption.value = "";
  } catch (error) {
    console.error("Error voting:", error);
  }
};
</script>

<style scoped>
.poll-section {
  margin-top: 40px;
  text-align: center;
}

.create-poll,
.vote-section {
  margin: 30px auto;
  max-width: 600px;
  text-align: left;
}

.option {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.option input[type="radio"] {
  margin-right: 8px;
}

.results {
  margin-top: 10px;
  font-size: 14px;
}

.new-option {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}
</style>
