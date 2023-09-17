<template>
    <div class="position-absolute top-50 start-50 translate-middle p-3" style="width: 20rem;">
        <form method="post" class="form-control" enctype="multipart/form-data">
            <h3 class="text-center">Login</h3>
            <div class="mb-3 mt-4">
                <label for="exampleFormControlInput1" class="form-label">Social Security Number</label>
                <input type="number" class="form-control" name="socialSecurityNumber" />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput2" class="form-label">Password</label>
                <input type="password" class="form-control" name="password" />
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Stay logged in</label>
            </div>
            <div class="mb-3 position-relative p-3">
                <button class="btn btn-primary position-absolute bottom-0 end-0">Login</button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>