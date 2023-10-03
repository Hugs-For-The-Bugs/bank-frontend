<template>

  <div class="d-flex sticky-top justify-content-center m-2 p-2 w-100">
    <form class="form-control" @submit.prevent="account" style="width: 30rem">
      <h3 class="text-center">Edit Account</h3>
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
      <div class="mb-3 position-relative p-3">
        <button type="submit" class="btn btn-primary position-absolute bottom-0 end-0">Update</button>
      </div>
      <div class="alert alert-danger" role="alert" v-show="showError">
        {{ message }}
      </div>
    </form>
  </div>
<!--  Modal-->
  <div class="modal" id="alertModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Success</h5>
        </div>
        <div class="modal-body">
          <p>The change has been saved.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="redirect">Dismiss</button>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script setup lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import {onBeforeMount, onMounted, reactive, ref} from 'vue';
import * as bootstrap from 'bootstrap';

const firstName = ref('');
const surname = ref('');
const birthday = ref('');
const phone = ref('');
const email = ref('');
const socialSecurityNumber = ref('');
const pass1 = ref('');
const pass2 = ref('');
const router = useRouter();
const password_equal = ref(false)
const showError = ref(false);
const accountExists = ref(false);
const serverError = ref(false);
const message = ref('');

let modal: bootstrap.Modal;

onBeforeMount(() => {
  axios({
    method: 'get',
    url: '/api/account'
  })
      .then(function (response) {
        console.log(response);
        firstName.value = response.data.firstName;
        surname.value = response.data.surname;
        birthday.value = response.data.birthday;
        phone.value = response.data.phone;
        email.value = response.data.email;
        socialSecurityNumber.value = response.data.socialSecurityNumber;
      })
      .catch(function (error) {
        console.log(error);
        if (error.response.status === 400) {
          message.value = error.response.data.msg;
        } else if (error.response.status === 500) {
          message.value = error.response.data.msg;
        }
      });
})

onMounted(() => {
  modal = new bootstrap.Modal(document.getElementById('alertModal')!);
})

function account() {
  axios({
    method: 'put',
    url: '/api/account',
    data: {
      firstName: firstName.value,
      surname: surname.value,
      birthday: birthday.value,
      phone: phone.value,
      email: email.value,
      socialSecurityNumber: socialSecurityNumber.value,
    }
  })
      .then(function (response) {
        console.log(response);
        showAlertModal()
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

function showAlertModal() {
  modal.show();
}

function redirect() {
  modal.hide()
  router.push({ name: "AccountDetails" })
}

</script>
    
<style scoped></style>