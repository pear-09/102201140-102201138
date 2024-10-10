<template>
  <div v-for="request in joinRequests" :key="request.projectId" class="message">
    <h3>{{ request.title }} (申请者: {{ request.requester }})</h3>
    <div>
      <button 
      v-if="!request.isHandled" 
      @click="handleDecision(request.projectId, 'approve', request.requester)">同意</button>
    <button 
      v-if="!request.isHandled" 
      @click="handleDecision(request.projectId, 'reject', request.requester)">拒绝</button>
    <span v-else>{{ request.status }}</span>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      joinRequests: [],
      username: ''
    };
  },
  mounted() {
    this.username = localStorage.getItem('loggedInUser'); 
    if (this.username) {
      this.fetchJoinRequests();
    } else {
      console.error('未找到当前用户');
    }
  },
  methods: {
    fetchJoinRequests() {
      fetch(`http://localhost:3000/api/user/${this.username}/joinRequests`)
        .then(response => response.json())
        .then(data => {
          this.joinRequests = data.map(request => ({
            ...request,
            isHandled: request.status === '已通过' || request.status === '未通过'
          }));
        })
        .catch(error => console.error('获取申请失败:', error));
    },

    handleDecision(projectId, decision, requester) {
      fetch(`http://localhost:3000/api/project/${projectId}/decision`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          decision: decision,
          requester: requester // 传递申请者的用户名
        })
      })
      .then(response => response.json())
       // eslint-disable-next-line
      .then(data => {
        // 更新对应申请的状态和按钮显示
        const request = this.joinRequests.find(req => req.requester === requester && req.projectId === projectId);
        if (request) {
          request.isHandled = true; // 标记为已处理
          request.status = decision === 'approve' ? '已通过' : '未通过'; // 更新状态
        }
      })
      .catch(error => console.error('错误:', error));
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
