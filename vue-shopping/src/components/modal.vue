<template>
  <div>
    <div class="modal md-modal">
        <div class="md-modal-inner">
          <!--<div class="modal-header">-->
              <!--<button class="modal-close">close</button>-->
          <!--</div>-->
          <div class="modal-content">
            <div class="confirm-tips">
              <slot name="content"></slot>
            </div>
            <div class="btn-wrap">
              <slot name="btn-group"></slot>
            </div>
          </div>
        </div>
    </div>
    <div class="modal-overlay" @click="closeModal"></div>

  </div>
</template>

<script>
  export default {
      props:['modalShow'],
      data() {
        return {

        }
      },
      methods:{
          closeModal() {
              this.$emit("close");
          }
      }
  }

</script>

<style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.5);
    z-index: 5;
  }
  .md-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 600px;
    height: auto;
    z-index: 10;
    transform: translate(-50%,-50%);
    background: #fff;
  }
  .modal-content {
   padding: 10px 50px 30px 50px;
  }
</style>


