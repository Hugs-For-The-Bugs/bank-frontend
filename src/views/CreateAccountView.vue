<template>
    <div class="d-flex sticky-top justify-content-center m-2 p-2 w-100">
        <form class="form-control" @submit.prevent="account" style="width: 30rem">
            <h3 class="text-center">Create Account</h3>
            <div class="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label">First Name</label>
                <input type="text" class="form-control" name="firstName" v-model="firstName" required />
            </div>
            <div class="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label">Surname</label>
                <input type="text" class="form-control" name="surname" v-model="surname" required />
            </div>
            <div class="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label">Birthday</label>
                <input type="date" class="form-control" name="birthday" v-model="birthday" required />
            </div>
            <div class="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label">Phone</label>
                <input type="text" class="form-control" name="phone" v-model="phone" required />
            </div>
            <div class="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label">Email</label>
                <input type="email" class="form-control" name="email" v-model="email" required />
            </div>
            <div class="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label">Social Security Number</label>
                <input type="text" class="form-control" name="socialSecurityNumber" v-model="socialSecurityNumber"
                    required />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">Password</label>
                <input type="password" class="form-control" @keyup="validatePassword" name="pass1" v-model="pass1"
                    required />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" :class="!passwordequal && pass1 && pass2 ? 'border-danger' : ''"
                    @keyup="validatePassword" name="pass2" v-model="pass2" required />
                <p v-show="!passwordequal && pass1 && pass2" class="m-0 p-0 text-danger">
                    Password does not match
                </p>
            </div>
            <div class="mb-3 position-relative p-3">
                <button type="submit" class="btn btn-primary position-absolute bottom-0 end-0">Create Account</button>
            </div>
            <div class="alert alert-danger" role="alert" v-show="showError">
                Account already exists
                {{ message }}
            </div>
        </form>
    </div>
</template>
    
<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const firstName = ref('');
const surname = ref('');
const birthday = ref('');
const phone = ref('');
const email = ref('');
const socialSecurityNumber = ref('');
const pass1 = ref('');
const pass2 = ref('');
const router = useRouter();
const passwordequal = ref(false)
const showError = ref(false);
const accountExists = ref(false);
const serverError = ref(false);
const message = ref('');

function validatePassword() {
    if (pass1.value === pass2.value) {
        passwordequal.value = true
    }
    else {
        passwordequal.value = false
    }
}

function account() {
    axios({
        method: 'post',
        url: '/api/account',
        data: {
            firstName: firstName.value,
            surname: surname.value,
            birthday: birthday.value,
            phone: phone.value,
            email: email.value,
            socialSecurityNumber: socialSecurityNumber.value,
            password: pass1.value
        }
    })
        .then(function (response) {
            console.log(response);
            router.push({ name: "Login", query: { accountCreated: 'true' } })
        })
        .catch(function (error) {
            console.log(error);
            showError.value = true;
            if (error.response.status === 400) {
                message.value = error.response.data.msg;
            } else if (error.response.status === 500) {
                message.value = error.response.data.msg;
            }
        });
}

</script>
    
<style scoped></style>