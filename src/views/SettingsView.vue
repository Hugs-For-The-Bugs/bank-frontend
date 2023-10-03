<template>

  <div class="d-flex sticky-top justify-content-center w-100">
    <form class="form-control m-2" @submit.prevent="editAccount" style="width: 30rem">
      <h3 class="text">Edit Account</h3>
      <div class="mb-3 mt-4">
        <label for="exampleFormControlInput1" class="form-label">First Name</label>
        <input type="text" class="form-control" name="firstName" v-model="firstName" required/>
      </div>
      <div class="mb-3 mt-4">
        <label for="exampleFormControlInput1" class="form-label">Surname</label>
        <input type="text" class="form-control" name="surname" v-model="surname" required/>
      </div>
      <div class="mb-3 mt-4">
        <label for="exampleFormControlInput1" class="form-label">Birthday</label>
        <input type="date" class="form-control" name="birthday" v-model="birthday" required/>
      </div>
      <div class="mb-3 mt-4">
        <label for="exampleFormControlInput1" class="form-label">Phone</label>
        <input type="text" class="form-control" name="phone" v-model="phone" required/>
      </div>
      <div class="mb-3 mt-4">
        <label for="exampleFormControlInput1" class="form-label">Email</label>
        <input type="email" class="form-control" name="email" v-model="email" required/>
      </div>
      <button type="submit" class="btn btn-primary my-2">Update Account</button>
      <div class="alert alert-danger" role="alert" v-show="showError">
        {{ message }}
      </div>
    </form>
    <div>
      <div class="form-control m-2" style="width: 30rem">
        <h3 class="text">Deactivate Account</h3>
        <button type="button" class="btn btn-danger my-2" @click="deactivateAccount">Deactivate Account</button>
      </div>
      <div class="h-100"></div>
    </div>
  </div>
  <!--  Modal-->
  <Modal
      ref="editAccountModal"
      title="Account Updated"
      content="Your account information has been updated successfully."
      :cancellable="false"
      @confirm="confirmEditAccount"
  />
  <Modal
      ref="deactivateAccountModal"
      title="Warning"
      content="This action will deactivate your account. Are you sure?"
      :cancellable="true"
      @confirm="confirmDeactivateAccount"
      @cancel="cancelDeactivateAccount"
  />
  <Modal
      ref="deactivateAccountCompleteModal"
      title="{{ deactivateAccountStatus }}"
      content="{{ deactivateAccountMessage }}"
      :cancellable="false"
      @confirm="confirmDeactivateAccountComplete"
  />

</template>

<script setup lang="ts">
import axios from 'axios';
import {useRouter} from 'vue-router';
import {onBeforeMount, ref} from 'vue';
import Modal from "@/components/Modal.vue";

const firstName = ref('');
const surname = ref('');
const birthday = ref('');
const phone = ref('');
const email = ref('');
const socialSecurityNumber = ref('');
const router = useRouter();
const showError = ref(false);
const message = ref('');

let editAccountModal = ref();
let deactivateAccountModal = ref();
let deactivateAccountCompleteModal = ref();

let deactivateAccountStatus = ref('');
let deactivateAccountMessage = ref('');

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

function editAccount() {
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
        editAccountModal.value.show()
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

function deactivateAccount() {
  deactivateAccountModal.value.show()
}

function confirmEditAccount() {
  editAccountModal.value.hide()
  router.push({name: "AccountDetails"})
}

function confirmDeactivateAccount() {
  deactivateAccountModal.value.hide()
  axios({
    method: 'delete',
    url: '/api/account'
  })
      .then(function (response) {
        console.log(response);
        deactivateAccountStatus.value = 'Account Deactivated';
        deactivateAccountMessage.value = 'Your account has been deactivated successfully.';
        deactivateAccountCompleteModal.value.show()
      })
      .catch(function (error) {
        console.log(error);
        deactivateAccountStatus.value = 'Error';
        deactivateAccountMessage.value = error.response.data.msg;
        deactivateAccountCompleteModal.value.show()
      })
}

function cancelDeactivateAccount() {
  deactivateAccountModal.value.hide()
}

function confirmDeactivateAccountComplete() {
  deactivateAccountCompleteModal.value.hide()
  router.push({name: "Home"})
}

</script>

<style scoped></style>