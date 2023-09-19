import { reactive } from "vue";

export const store = reactive({
    login: false,
    userLogin() {
        this.login = true;
    },
    userLogout() {
        this.login = false;
    },
})