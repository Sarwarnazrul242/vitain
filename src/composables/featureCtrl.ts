import { ref } from 'vue';
export const loading = ref(sessionStorage.getItem("loading") ?? "false");
export const userState = ref(sessionStorage.getItem("userState") ?? "Signed Out");
//Handles the functionality of state changes and feautes meant to enact after the change
export function updateLoading() {
  loading.value = sessionStorage.getItem("loading") ?? "false";
}

export function updateUserState() {
  userState.value = sessionStorage.getItem("userState") ?? "Signed Out";
}


