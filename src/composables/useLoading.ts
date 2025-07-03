import { ref } from 'vue';

export const loading = ref(sessionStorage.getItem("loading") ?? "false");

export function updateLoading() {
  loading.value = sessionStorage.getItem("loading") ?? "false";
}
