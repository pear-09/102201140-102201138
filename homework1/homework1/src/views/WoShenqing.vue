<template>
  <div>
      <h1>我的申请记录</h1>
      <ul>
          <li v-for="(request, index) in sentRequests" :key="index">
              <span>{{ request.title }} - {{ request.status }}</span>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
      return {
          sentRequests: []
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
              const response = await fetch(`http://192.168.0.11:3000/api/user/${username}/sentRequests`); // 更新为正确的 URL
              if (response.ok) {
                  this.sentRequests = await response.json();
              } else {
                  console.error('获取申请记录失败:', response.statusText);
              }
          } catch (error) {
              console.error('请求出错:', error);
          }
      }
  }
};
</script>

<style scoped>
/* 你可以添加样式 */
</style>
