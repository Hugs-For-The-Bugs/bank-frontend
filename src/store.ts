import { reactive } from "vue";

export const store = reactive({
    login: true,
    userLogin() {
        this.login = true;
    },
    userLogout() {
        this.login = false;
    },
})