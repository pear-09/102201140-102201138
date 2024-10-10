<template>
  <div class="login-container">
    <h1>登录界面</h1>
    
    <div v-if="!isLoggedIn" class="login-form">
      <label for="username">用户名:</label>
      <input v-model="username" type="text" placeholder="请输入用户名">
      <button @click="login">登录</button>
    </div>
    
    <div v-if="isLoggedIn" class="welcome-message">
      <h2>欢迎，{{ currentUser }}!</h2>
      <button @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      isLoggedIn: false,
      currentUser: ''
    };
  },
  created() {
    const savedUser = localStorage.getItem('loggedInUser');
    if (savedUser) {
      this.isLoggedIn = true;
      this.currentUser = savedUser;
    }
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/login', { username: this.username })
      // eslint-disable-next-line
        .then(response => {
          this.isLoggedIn = true;
          this.currentUser = this.username;
          localStorage.setItem('loggedInUser', this.username);
        })
        .catch(error => {
          alert(error.response.data.message || '登录失败');
        });
    },
    logout() {
      this.isLoggedIn = false;
      this.currentUser = '';
      this.username = '';
      localStorage.removeItem('loggedInUser');
    }
  }
};
</script>





<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100vh;
  background-color: transparent!important;
  padding-top: 50px;
}

h1 {
  color: #f0a844;
}

.login-form {
  background-color: #fefae0;
  padding: 20px;
  margin-top: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  margin-bottom: 10px;
  color: #333;
}

input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #faedcd;
  border-radius: 5px;
  width: 100%;
  border: none;
  outline: none;
}

button {
  padding: 10px;
  background-color: #f0a844;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #F2C078;
}

.welcome-message {
  text-align: center;
  margin-top: 20px;
}
</style>
