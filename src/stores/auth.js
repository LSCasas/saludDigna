import { defineStore } from "pinia";
import { getAuthenticatedUser } from "../api/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      if (!this.user) {
        this.user = await getAuthenticatedUser();
      }
    },
    clearUser() {
      this.user = null;
    },
  },
});
