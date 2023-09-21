<template>
    <div class="position-absolute top-50 start-50 translate-middle p-3" style="width: 20rem;">
        <div class="alert alert-success" role="alert" v-show="showAlert">
            Account Created Successfully
        </div>
        <div class="alert alert-danger" role="alert" v-show="showError">
            {{ message }}
        </div>
        <form class="form-control" @submit.prevent="login">
            <h3 class="text-center">Login</h3>
            <div class="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label">Social Security Number</label>
                <input class="form-control" name="socialSecurityNumber" v-model="socialSecurityNumber" />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" v-model="password" />
            </div>
            <!-- <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Stay logged in</label>
            </div> -->
            <div class="mb-3 position-relative p-3">
                <button type="submit" class="btn btn-primary position-absolute bottom-0 end-0">Login</button>
            </div>
        </form>

    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { loggedIn } from '@/model';


const socialSecurityNumber = ref('');
const password = ref('');
const router = useRouter();
const route = useRoute();
const showAlert = ref(false);
const showError = ref(false);
const message = ref('');

onMounted(() => {
    console.log(route.query);
    if (route.query.accountCreated) {
        showAlert.value = true;
    }
})

function login() {
    axios({
        method: 'post',
        url: '/api/login',
        data: {
            socialSecurityNumber: socialSecurityNumber.value,
            password: password.value
        }
    })
        .then(function (response) {
            console.log(response);
            router.push({ name: "AccountDetails" });
            loggedIn.value = true;

        })
        .catch(function (error) {
            console.log(error);
            showError.value = true
            message.value = error.response.data.msg
        });
}

</script>

<style scoped></style>@/util