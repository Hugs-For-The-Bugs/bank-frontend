import { reactive } from "vue";

export const store = reactive({
    login: false,
    userID: -1,
    userLogin() {
        this.login = true;
    },
    userLogout() {
        this.login = false;
    },
})