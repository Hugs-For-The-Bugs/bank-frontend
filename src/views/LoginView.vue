<template>
    <div class="position-absolute top-50 start-50 translate-middle p-3" style="width: 20rem;">
      <div class="alert alert-success" role="alert" v-show="showAlert" >
          Login Success.
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
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Stay logged in</label>
            </div>
            <div class="mb-3 position-relative p-3">
                <button type="submit" class="btn btn-primary position-absolute bottom-0 end-0" >Login</button>
            </div>
        </form>

    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { store } from '@/store'
import { useRouter } from "vue-router";


const socialSecurityNumber = ref('');
const password = ref('');
const router = useRouter();

let showAlert = false;

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
        if (response.data.code == 0) {
            store.userID = response.data.id;
            console.log(response.data.id)
            store.login = true;
            showAlert = true;
            router.push({ name: "AccountDetails" });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}



</script>

<style scoped></style>