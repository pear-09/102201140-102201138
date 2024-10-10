<template>
  <div v-if="projects.length === 0">没有参与的项目</div>
  <div v-else>
  <button id="guanli" @click="toggleManage">{{ isManaging ? '完成' : '管理项目' }}</button>
  <div class="list">
    <div class="items" v-for="(item, index) in projects" :key="item.id">
      <p @click="goToProjectDetail(item.id)">{{ item.content }}</p>
      <div class="title">
        <h3 @click="goToProjectDetail(item.id)">{{ item.title }}</h3>
        <button @click="showMembers(item.members, item.creator, index)" v-show="isShow">成员</button>
        <button @click="leaveProject(item.id)" v-show="isShow">退出</button>
      </div>
    </div>
  </div>
  </div>
  <!-- 成员列表弹窗 -->
  <div v-if="showMembersList" class="modal">
    <h3>成员列表</h3>
    <ul>
      <li v-for="(member, idx) in currentMembers" :key="idx">
        {{ member }}
      </li>
    </ul>
    <button @click="closeMembers" class="closed">关闭</button>
  </div>

  <!-- 确认解散弹窗 -->
  <div v-if="showExitConfirm" class="modal">
    <p>确定要解散该项目吗？</p>
    <button @click="exitTeam(currentProjectIndex)">确定</button>
    <button @click="cancelExit">取消</button>
  </div>

  <!-- 项目状态选择弹窗 -->
  <div v-if="showStatusSelect" class="modal">
    <h3>选择项目状态</h3>
    <select v-model="selectedStatus">
      <option value="招募中">招募中</option>
      <option value="进行中">进行中</option>
      <option value="已完成">已完成</option>
    </select>
    <button @click="updateProjectStatus">保存</button>
    <button @click="cancelStatusChange">取消</button>
  </div>


</template>

<script>
import axios from 'axios';

export default {
  name: 'WoCanyu',
  data() {
    return {
      projects: [],
      isShow: false,
      isManaging: false,
      showExitConfirm: false,
      showMembersList: false,
      currentMembers: [],
      
    };
  },
  created() {
    this.fetchUserProjects();
  },
  methods: {
    toggleManage() {
      this.isShow = !this.isShow;
      this.isManaging = !this.isManaging;
    },
    showMembers(members, creator, index) {
      this.currentMembers = members;
      this.currentCreator = creator; // 设置创建者
      this.currentProjectIndex = index; // 设置当前项目索引
      this.showMembersList = true;
    },
    closeMembers() {
      this.showMembersList = false;
    },
    async fetchUserProjects() {
      const username = localStorage.getItem('loggedInUser');
      const url = `http://localhost:3000/api/user/${username}/projects`;

      try {
        const response = await axios.get(url);
        this.projects = response.data;
      } catch (error) {
        console.error('获取项目失败', error);
      }
    },
    goToProjectDetail(projectId) {
      this.$router.push({ name: 'ProgramDetail', params: { id: projectId } }); // 修改为 'ProgramDetail'
    },
    async leaveProject(projectId) {
      const username = localStorage.getItem('loggedInUser');
      const url = `http://localhost:3000/api/project/${projectId}/leave`;

      try {
        await axios.put(url, { username });
        this.fetchUserProjects(); // 重新获取项目列表
        alert('已成功退出项目');
      } catch (error) {
        console.error('退出项目失败', error);
        alert('退出项目失败，请重试。');
      }
    }
  }
}
</script>

<style scoped>
/* #wo-canyu {
  background-color: #fbeaff;
  padding: 20px;
}
.list .items {
  background-color: #fff;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ccc;
}
.list .items h3 {
  cursor: pointer;
  color: #007bff;
}
.list .items h3:hover {
  text-decoration: underline;
} */
#guanli{
  width: 80px;
  height: 30px;
  margin-top: 20px;
  margin-left: 2.5%;
  border: none;
  background-color: brown;
  color: #fff;
  border-radius: 5px;
}

#guanli:hover {
 background-color:rgb(180, 32, 32);
 transform: scale(1.05);
 transition: all .3s;
}

.list .items {
  width: 95%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  margin: 20px auto;
  border-radius: 10px;
  border: solid 1px gainsboro;
  box-shadow: 5px 5px 3px 1px gainsboro;

}

.list .items:hover{
  transform: translateY(-2px);
  transition: all .3s;
}

.list .items p{
  width: 100%;
  height: 60%;
  overflow: hidden; 
  display: -webkit-box; /* 需要使用盒子模型 */
  -webkit-box-orient: vertical; /* 垂直排列 */
  -webkit-line-clamp: 2; /* 设置显示的行数，这里为 3 行 */
  text-overflow: ellipsis; /* 加上省略号 */
  padding: 15px; 
  text-indent: 2em;
}

.list .items .title {
  width: 100%;
  height: 40%;
  display:flex;
  justify-content: end;
  align-items: end;
}
.list .items .title button{
  width: 55px;
  height: 25px;
  margin-bottom: 10px;
  margin-right: 5px;
  background-color: brown;
  color: #fff;
  border-radius: 5px;
  border: none;
}

.list .items .title button:hover{
  background-color:rgb(180, 32, 32);
  transform: scale(1.05);
}



.list .items .title h3{
  flex: 1;
  padding: 0 0 10px 15px;
}

/* .modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  z-index: 1000;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
} */
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  width: 400px; /* 增大弹窗宽度 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: fadeIn 0.3s ease-in-out;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.modal h3 {
  margin-bottom: 20px;
  font-size: 20px;
  color: #333;
}

.modal p, .modal ul {
  margin-bottom: 20px;
}

.modal button {
  background-color: #ff6347; /* 美观的按钮颜色 */
  border: none;
  color: white;
  padding: 8px 15px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

}

.modal .closed {
  width: 100px;
  margin-left: 125px;
}
.modal button:hover {
  background-color: #ff4500;
}

.modal select {
  width: 100%;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.modal ul {
  list-style-type: none;
  padding: 0;
}

.modal ul li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

</style>
