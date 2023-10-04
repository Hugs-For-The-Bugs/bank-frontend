<script setup lang="ts">
import {onMounted, ref} from "vue";
import { Modal } from 'bootstrap';
import type {Obj} from "@popperjs/core";

const emits = defineEmits(['cancel', 'confirm'])

const props = defineProps({
  cancellable: {
    type: Boolean,
    required: false,
    default: false
  },
  title: {
    type: String,
    required: true,
    default: ''
  },
  content: {
    type: String,
    required: true,
    default: ''
  }
})

let modalEle = ref();
let thisModalObj: Modal;

onMounted(() => {
  thisModalObj = new Modal(modalEle.value as Element)
})

function _show() {
  thisModalObj.show()
}

function _hide() {
  thisModalObj.hide()
}

defineExpose({
  show: _show,
  hide: _hide
})

function confirm() {
  emits('confirm')
}

function cancel() {
  emits('cancel')
}

</script>

<template>
  <div class="modal" tabindex="-1" role="dialog" ref="modalEle">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
        </div>
        <div class="modal-body">
          <p>{{ content }}</p>
        </div>
        <div class="modal-footer">
          <button v-if="cancellable" type="button" class="btn btn-secondary" @click="cancel">Cancel</button>
          <button type="button" class="btn btn-primary" @click="confirm">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>