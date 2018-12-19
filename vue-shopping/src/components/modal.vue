<template>
  <div>
    <div class="modal">
        <div class="md-modal-inner">
          <div class="modal-header">
              <button class="modal-close">close</button>
          </div>
          <div class="modal-content">
            <div class="comfirm-tips">
              <slot name="message"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btn-group"></slot>
            </div>
          </div>
        </div>
        <div class="modal-overlay"></div>
    </div>

  </div>
</template>

<style scoped>

</style>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>
