<template>
    <!-- <div class="w-100" style="background-color: grey">AccountDetails</div> -->
    <div class="flex-column sticky-top sticky-center p-2 w-100">
        <div class="container-sm border-1">
            <h2 class="text-center text-bg-primary">Account Overview</h2>
            <div class="mb-3 mt-4">
                <h3 class="text-center">Current Balance: <span class="text-primary">{{ accountDetails.balance }}</span></h3>
            </div>
            <div class="mb-3">
                <h4 class="text-center">{{ accountDetails.firstName }} {{ accountDetails.surname }}</h4>
            </div>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item" style="width: 30rem;">Social Security Number: <span class="text-primary">{{ accountDetails.socialSecurityNumber }}</span></li>
            <li class="list-group-item" style="width: 30rem;">Phone Number: <span class="text-primary">{{ accountDetails.phone }}</span></li>
            <li class="list-group-item" style="width: 30rem;">Email: <span class="text-primary">{{ accountDetails.email }}</span></li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

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

</script>

<style scoped></style>@/util