<template>
 <header class="header">
   <div class="header-left">
     <img src="../static/imooc.jpg" alt="">
   </div>
   <div class="header-right">
      <div v-show="!modalShow" @click="showModal">Login</div>
      <div v-show="modalShow">
        <span></span>
        <span>Logout</span>
      </div>
   </div>

   <modal v-show="modalShow" modalShow="modalShow" @close="CloseModal">
     <div slot="content">
       <div class="inner-content">
         <p>Login</p>
         <div class="loginInput">
           <input type="text" v-model="userName" placeholder="用户名">
         </div>
         <div class="loginInput">
           <input type="password" v-model="userPwd" placeholder="密码">
         </div>
       </div>
     </div>
     <div slot="btn-group">
        <button class="btn-login" @click="login">登 录</button>
     </div>
   </modal>

 </header>

</template>

<style>

  .header {
    max-width: 1280px;
    height: 70px;
    margin: 0 auto;
  }
  .header-left {
    float: left;
  }
  .header-right {
    float: right;
  }

  .loginInput {
    border: 2px solid #e5e5e5;
    margin: 10px 0;
    padding: 0 15px;
  }
  .loginInput input {
    border: 0;
    outline: none;
    width: 100%;
    height: 42px;
    line-height: 42px;
    padding-left: 15px;
  }

  .btn-login {
    height: 40px;
    width: 100%;
    background: #009de6;
    color: #fff;
    font-size: 20px;
    border:2px solid #009de6;
  }

</style>

<script>

  import Modal from '../components/modal'

  export  default {
    data() {
      return {
        userName:'',
        userPwd:'',
        modalShow:false
      }
    },
    components:{
      Modal
    },
    methods:{
        login() {
            if(!this.userName || !this.userPwd){
                console.log("登录失败");
                return;
            }
            let params = {
                userName:this.userName,
                userPwd:this.userPwd
            };

           this.$axios.post("http://localhost:3000/users/login",params).then((res)=>{
              console.log(res);

           })
        },
      showModal() {
          this.modalShow = true;
      },
      CloseModal() {
          this.modalShow = false;
      }
    }
  }


</script>
