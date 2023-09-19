import { reactive } from "vue";

export const store = reactive({
    login: true,
    userID: -1,
    userLogin() {
        this.login = true;
    },
    userLogout() {
        this.login = false;
    },
})