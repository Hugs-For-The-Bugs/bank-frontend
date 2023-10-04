<template>
  <div class="flex-column sticky-top sticky-center p-2 w-100">
    <div class="container-sm border-1">
      <h2 class="text-center text-bg-primary">Account Overview</h2>
      <div class="mb-3 mt-4">
        <h3 class="text-center">Current Balance: <span class="text-primary">{{ accountDetails.balance }}</span></h3>
      </div>
      <div class="mb-3">
        <h4 class="text-center">{{ accountDetails.firstName }} {{ accountDetails.surname }}</h4>
      </div>

      <ul class="list-group list-group-flush">
        <li class="list-group-item" style="width: 30rem;">Social Security Number: <span
            class="text-primary">{{ accountDetails.socialSecurityNumber }}</span></li>
        <li class="list-group-item" style="width: 30rem;">Phone Number: <span class="text-primary">{{
            accountDetails.phone
          }}</span></li>
        <li class="list-group-item" style="width: 30rem;">Email: <span class="text-primary">{{
            accountDetails.email
          }}</span></li>
      </ul>
    </div>


    <!--Transactions-->
    <div class="container-sm border-1 mt-5">
      <h2 class="mb-3">Transactions</h2>

      <div v-if="!transactions">
        <p>There are no existing transactions.</p>
      </div>

      <div class="card mb-3" v-for="transaction in transactions">
        <div class="card-body d-flex justify-content-between">
          <div>
            <p v-if="accountDetails.socialSecurityNumber === transaction.from_phone">
              Transfer to {{ transaction.to_phone }}
            </p>
            <p v-else>Transfer from {{ transaction.from_phone }}</p>
            <p class="mb-0"
               :class="[transaction.state === 'Successful' ? 'text-success' : 'text-danger']">
              {{ transaction.state }}
            </p>
          </div>
          <div
              :class="[accountDetails.phone !== transaction.from_phone ? 'text-success' : 'text-danger']"
              class="h2">
            <span v-if="accountDetails.phone === transaction.from_phone">-</span>
            {{ transaction.amount }} SEK
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script setup lang="ts">
import axios from 'axios';
import {onMounted, ref} from 'vue';

const transactions = ref([
  {
    id: 0,
    from_phone: '',
    to_phone: '',
    from_social_security_number: '',
    to_social_security_number: '',
    amount: 0,
    state: ''
  }
])
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

onMounted(() => {
  getAccountDetails();
  getTransactions();
})

function getAccountDetails() {
  axios({
    method: 'get',
    url: '/api/account',
  })
      .then(response => {
        accountDetails.value = response.data;
      })
      .catch(error => {
        console.log(error);
      })
}

function getTransactions() {
  axios({
    method: 'get',
    url: '/api/transaction',
  })
      .then(response => {
        transactions.value = response.data;
      })
      .catch(error => {
        console.log(error);
      })
}

</script>

<style scoped></style>@/util