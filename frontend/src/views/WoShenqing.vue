<template>
  <div> 
    <div v-for="(request, index) in sentRequests" :key="index" class="message">
      <h3>{{ request.title }} - {{ request.status }}</h3>
    </div>
    <div v-if="errorMessage">{{ errorMessage }}</div> <!-- 显示错误信息 -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      sentRequests: [],
      errorMessage: '', // 用于存储错误信息
    };
  },
  created() {
    const username = localStorage.getItem('loggedInUser'); // 从 Local Storage 获取当前用户
    console.log('用户名:', username);
    this.fetchSentRequests(username);
  },
  methods: {
    async fetchSentRequests(username) {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${username}/sentRequests`); // 更新为正确的 URL
        if (response.ok) {
          this.sentRequests = await response.json();
          console.log('申请记录:', this.sentRequests); // 输出申请记录以调试
        } else {
          this.errorMessage = `获取申请记录失败: ${response.statusText}`;
          console.error('获取申请记录失败:', response.statusText);
        }
      } catch (error) {
        this.errorMessage = '请求出错，请重试。';
        console.error('请求出错:', error);
      }
    }
  }
};
</script>

<style scoped>
.message {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px auto;
  height: 100px;
  background-color: #fff;
  border: solid 1px gainsboro;
  box-shadow: 5px 5px 3px 2px gainsboro;
  border-radius: 10px;
}

.message h3{
  transform: translateX(20px);
}

.message div{
  /* transform: translateX(-90%); */
}

.message div button{
  width: 50px;
  height: 25px;
  margin-right: 10px;
  background-color: brown;
  color: #fff;
  border: none;
  border-radius: 5px;
  /* transform: translateX(-90%); */
}

.message div button:hover {
 background-color:rgb(180, 32, 32);
 transform: scale(1.05);
 transition: all .3s;
}

.message div span{
  margin-right: 40px;
  color: brown;
}
.message:hover{
  transform: translateY(-2px);
  transition: all .3s;
}
</style>

