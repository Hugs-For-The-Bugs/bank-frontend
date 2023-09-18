<template>
<div class="d-flex sticky-top justify-content-center m-2 p-2 w-100">
    <form method="post" class="form-control" enctype="multipart/form-data" style="width: 30rem">
        <h3 class="text-center">Create Account</h3>
        <div class="mb-3 mt-4">
            <label for="exampleFormControlInput1" class="form-label">First Name</label>
            <input type="text" class="form-control" name="firstName" />
        </div>
        <div class="mb-3 mt-4">
            <label for="exampleFormControlInput1" class="form-label">Surname</label>
            <input type="text" class="form-control" name="surname" />
        </div>
        <div class="mb-3 mt-4">
            <label for="exampleFormControlInput1" class="form-label">Birthday</label>
            <input type="text" class="form-control" name="birthday" />
        </div>
        <div class="mb-3 mt-4">
            <label for="exampleFormControlInput1" class="form-label">Phone</label>
            <input type="text" class="form-control" name="phone" />
        </div>
        <div class="mb-3 mt-4">
            <label for="exampleFormControlInput1" class="form-label">Email</label>
            <input type="email" class="form-control" name="email" />
        </div>
        <div class="mb-3 mt-4">
            <label for="exampleFormControlInput1" class="form-label">Social Security Number</label>
            <input type="text" class="form-control" name="socialSecurityNumber" />
        </div>
        <div class="mb-3">
            <label for="exampleFormControlInput2" class="form-label">Password</label>
            <input type="password" class="form-control" name="password" />
        </div>
        <div class="mb-3 position-relative p-3">
            <button class="btn btn-primary position-absolute bottom-0 end-0">Create Account</button>
        </div>


    </form>
    
    
    
    </div>
    </template>
    
<script setup lang="ts">

</script>
    
<style scoped></style>