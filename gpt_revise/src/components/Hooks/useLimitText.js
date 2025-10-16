// src/composables/useLimitText.js
import { computed } from "vue";

export default function useLimitText(text, limit) {
  return computed(() => {
    if (!text) return "";
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  });
}
