<template>
  <div class="d-flex sticky-top justify-content-center w-100">
    <form class="form-control m-2" @submit.prevent="transfer" style="width: 30rem">
      <h3 class="text">Transfer Money</h3>
      <div class="mb-3 mt-4">
        <h5 class="text">Current Balance: {{ accountDetails.balance }}</h5>
      </div>
      <div class="mb-3 mt-4">
        <label for="exampleFormControlInput1" class="form-label">Target Account Phone Number</label>
        <input type="text" class="form-control" name="firstName" v-model="targetPhoneNumber" required/>
      </div>
      <div class="mb-3 mt-4">
        <label for="exampleFormControlInput1" class="form-label">Amount</label>
        <input type="text" class="form-control" name="surname" v-model="amount" required/>
      </div>
      <button type="submit" class="btn btn-primary my-2">Transfer</button>
      <div class="alert alert-danger" role="alert" v-show="showError">
        Error: {{ message }}
      </div>
    </form>
  </div>

  <Modal
      ref="transferModal"
      title="Success"
      content="Your money has been transferred successfully."
      :cancellable="false"
      @confirm="confirmTransfer"
  />
</template>
    
<script setup lang="ts">
import axios from 'axios';
import {onBeforeMount, ref} from 'vue';
import Modal from "@/components/Modal.vue";

const targetPhoneNumber = ref('');
const amount = ref('');
const showError = ref(false);
const message = ref('');

const accountDetails = ref({
  id: 0,
  socialSecurityNumber: "",
  firstName: "",
  surname: "",
  birthday: "",
  phone: "",
  email: "",
  balance: 0
})

let transferModal = ref();

onBeforeMount(() => {
  axios({
    method: 'get',
    url: '/api/account',
  })
  .then(response => {
    console.log(response)
    accountDetails.value = response.data;
  })
  .catch(error => {
    console.log(error);
    showError.value = true;
    message.value = error.response.data.msg;
  })
})

function transfer() {
  axios({
    method: 'post',
    url: '/api/transaction',
    data: {
      targetPhoneNumber: targetPhoneNumber.value,
      amount: Number(amount.value)
    }
  })
  .then(response => {
    console.log(response)
    transferModal.value.show()
  })
  .catch(error => {
    console.log(error);
    showError.value = true;
    message.value = error.response.data.msg;
  })
}

function confirmTransfer() {
  transferModal.value.hide()
}
</script>
    
<style scoped></style>