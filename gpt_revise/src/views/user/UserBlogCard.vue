<template>
  <div class="col-md-4" style="margin-bottom: 15px">
    <div class="card">
      <img :src="img" class="card-img-top fixed-image" :alt="title" />
      <div class="card-body">
        <h5 class="card-title">{{ limitedTitle }}</h5>
        <p class="card-text">{{ limitedDescription }}</p>
        <p class="card-text text-muted">{{ timeAgo }}</p>
      </div>

      <div class="card-footer d-flex justify-content-between align-items-center mt-3">
        <template v-if="showActions">
          <button
            v-if="onEdit"
            type="button"
            class="btn btn-warning"
            @click="onEdit"
          >
            <font-awesome-icon icon="pen" />
          </button>

          <button
            type="button"
            class="btn btn-primary mx-auto"
            @click="handleReadMore"
          >
            Read More +
          </button>

          <button
            v-if="onDelete"
            type="button"
            class="btn btn-danger"
            @click="onDelete"
          >
            <font-awesome-icon icon="trash" />
          </button>
        </template>

        <button
          v-else-if="showReadMore && !showActions"
          type="button"
          class="btn btn-primary mx-auto"
          @click="handleReadMore"
        >
          Read More +
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import useLimitText from "@/components/Hooks/useLimitText"; // your custom hook


const props = defineProps({
  img: String,
  title: String,
  description: String,
  createdAt: String,
  showActions: Boolean,
  showReadMore: Boolean,
  onEdit: Function,
  onDelete: Function,
  postId: String,
});

const router = useRouter();

const handleReadMore = () => {
  router.push(`/blog-details/${props.postId}`);
};

const limitedTitle = useLimitText(props.title, 35);
const limitedDescription = useLimitText(props.description, 135);
const timeAgo = computed(() => moment(props.createdAt).fromNow());
</script>

<style scoped>
.fixed-image {
  width: 100%;
  height: 200px; /* Adjust the height as needed */
  object-fit: auto; /* Ensures the image covers the entire area without distortion */
}

.card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-body {
  flex-grow: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

</style>
