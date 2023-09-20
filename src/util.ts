import { reactive } from "vue";

export const store = reactive({
  userID: -1,
  login: false,
  userLogin() {
    this.login = true;
  },
  userLogout() {
    this.login = false;
  },
});
