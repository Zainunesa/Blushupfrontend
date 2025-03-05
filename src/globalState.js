import { reactive } from "vue";

export const globalState = reactive({
  isLoggedIn: false, // Global login state
  isAdminLoggedIn: false, // Global login state
});
