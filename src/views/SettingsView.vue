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
      <div class="alert alert-danger" role="alert" v-show="showEditAccountError">
        {{ editAccountResponseMessage }}
      </div>
    </form>
    <div class="d-flex flex-column">
      <div>
        <form class="form-control m-2" @submit.prevent="changePassword" style="width: 30rem">
          <h3 class="text">Change Password</h3>
          <div class="mb-3">
            <label for="exampleFormControlInput2" class="form-label">Password</label>
            <input type="password" class="form-control" @keyup="validatePassword" name="pass1" v-model="pass1"
                   required />
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput2" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" :class="!password_equal && pass1 && pass2 ? 'border-danger' : ''"
                   @keyup="validatePassword" name="pass2" v-model="pass2" required />
            <p v-show="!password_equal && pass1 && pass2" class="m-0 p-0 text-danger">
              Password does not match
            </p>
          </div>
          <button type="submit" class="btn btn-primary my-2">Change Password</button>
          <div class="alert alert-danger" role="alert" v-show="showChangePasswordError">
            {{ changePasswordResponseMessage }}
          </div>
        </form>
      </div>

      <div>
        <div class="form-control m-2" style="width: 30rem">
          <h3 class="text">Deactivate Account</h3>
          <button type="button" class="btn btn-danger my-2" @click="deactivateAccount">Deactivate Account</button>
        </div>
        <div class="h-100"></div>
      </div>
    </div>

  </div>
  <!--  Modal-->
  <Modal
      ref="editAccountModal"
      :title="editAccountStatus"
      :content="editAccountMessage"
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
      :title="deactivateAccountStatus"
      :content="deactivateAccountMessage"
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
const showEditAccountError = ref(false);
const editAccountResponseMessage = ref('');
const showChangePasswordError = ref(false);
const changePasswordResponseMessage = ref('');

let editAccountModal = ref();
let deactivateAccountModal = ref();
let deactivateAccountCompleteModal = ref();

let editAccountStatus = ref('');
let editAccountMessage = ref('');

let deactivateAccountStatus = ref('');
let deactivateAccountMessage = ref('');

let pass1 = ref('');
let pass2 = ref('');
let password_equal = ref(false);


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
        editAccountResponseMessage.value = error.response.data.msg;
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
        editAccountStatus.value = 'Account Updated';
        editAccountMessage.value = 'Your account information has been updated successfully.';
        editAccountModal.value.show()
      })
      .catch(function (error) {
        console.log(error);
        editAccountResponseMessage.value = error.response.data.msg;
        showEditAccountError.value = true;
      });
}

function changePassword() {
  if (!password_equal.value) {
    return;
  }
  axios({
    method: 'put',
    url: '/api/account/password',
    data: {
      password: pass1.value
    }
  })
      .then(function (response) {
        console.log(response);
        pass1.value = '';
        pass2.value = '';
        password_equal.value = false;
        editAccountStatus.value = 'Password Changed';
        editAccountMessage.value = 'Your password has been changed successfully.';
        editAccountModal.value.show()
      })
      .catch(function (error) {
        console.log(error);
        changePasswordResponseMessage.value = error.response.data.msg;
        showChangePasswordError.value = true;
      });
}

function validatePassword() {
  password_equal.value = pass1.value === pass2.value;
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
  document.cookie = 'SESSIONID' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  window.location.reload()
}

</script>

<style scoped></style>