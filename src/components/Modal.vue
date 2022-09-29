<template>
  <div class="modal-dialog" style="max-width: 450px">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title text-center w-100">{{ title }}</h5>
      </div>
      <div class="modal-body text-center">
        <slot name="modalContent" />
      </div>
      <div class="modal-footer w-100 d-flex justify-content-around">
        <div style="width: 200px">
          <button
            type="button"
            class="btn btn-outline-primary w-100"
            data-bs-dismiss="modal"
          >
            Kembali
          </button>
        </div>
        <div style="width: 200px">
          <slot name="buttonConfirm" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "comp-modal",
  props: {
    title: String
  }
};
</script>
