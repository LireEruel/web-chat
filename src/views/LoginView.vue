<script setup>
import { useUserStore } from '../stores/UserStore';
import { mapActions, mapState } from 'pinia';
const userStore = useUserStore();
</script>

<script>
export default {
  data() {
    return {
      name: '',
      password: '',
    };
  },
  methods: {
    login () {
      console.log(this.name)
      if (this.name.length > 0) {
        this.userStore.login(this.name);
        this.$router.push('/home');
      } else {
        this.$swal({
          icon: 'error',
          title: 'Oops...',
          text: '이름은 2글자 이상 입력해주세요!',
          //footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    },
  },
};
</script>

<template>
  <div class="login">
    <div class="content">
      <div class="icon-wrap">
        <img
          alt="logo image"
          class="logo"
          src="@/assets/logo.svg"
          width="75"
          height="75"
        />
      </div>
      <h2 class="title">사랑하는 사람들과 소통해보세요.</h2>
      <div class="login-form-wrap">
        <form class="login-form" @submit.prevent="login" >
          <input
            v-model="name"
            type="text"
            class="login-input"
            placeholder="name"
          />
          <div class="button-wrap">
            <button  type="submit" value="1" class="login-button">계속</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
.login {
  display: table-cell;
  vertical-align: middle;
}
.content {
  display: block;
}
.icon-wrap {
  align-items: center;
  display: flex;
  height: 120px;
  justify-content: center;
  min-width: 120px;
}
.title {
  color: black;
  font-size: 35px;
  font-weight: 450;
  line-height: 1.5;
  margin-top: 24px;
  margin-bottom: 45px;
  text-align: center;
}
.login-form-wrap {
  display: block;
  margin-top: 32px;
}
.login-form {
  margin: 0;
  padding: 0;
  display: block;
}
.login-input {
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  color: rgba(0, 0, 0, 1);
  display: block;
  font-size: 17px;
  height: 42px;
  margin-bottom: 12px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 16px;
  width: 286px;
}
.button-wrap {
  display: block;
}
.login-button {
  display: block;
  background-color: #0a7cff;
  border-radius: 50px;
  color: white;
  font-size: 15px;
  padding: 9.5px 20px;
  border: 0px;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}
</style>
