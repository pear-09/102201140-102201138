<template>
  <button id="guanli" @click="toggleManage">{{ isManaging ? '完成' : '管理项目' }}</button>
  <div class="list">
    <div class="items" v-for="(item, index) in projects" :key="index">
      <p @click="goToProjectDetail(item.id)">{{ item.content }}</p>
      <div class="title">
        <h3 @click="goToProjectDetail(item.id)">{{ item.title }}</h3>
        <button v-show="isShow" @click="editProject(index)">编辑</button>
        <button @click="showMembers(item.members, item.creator, index)" v-show="isShow">成员</button>
        <button @click="changeStatus(item, index)" v-show="isShow">状态</button>
        <button @click="confirmExit(index)" v-show="isShow">解散</button>
      </div>
    </div>
  </div>

  <!-- 成员列表弹窗 -->
  <div v-if="showMembersList" class="modal">
    <h3>成员列表</h3>
    <ul>
      <li v-for="(member, idx) in currentMembers" :key="idx">
        {{ member }}
        <button v-if="member !== currentCreator" @click="removeMember(member)">删除</button>
      </li>
    </ul>
    <button @click="closeMembers">关闭</button>
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
  name: 'WoFabu',
  data() {
    return {
      projects: [],
      isShow: false,
      isManaging: false,
      showExitConfirm: false,
      showMembersList: false,
      currentMembers: [],
      currentCreator: '', // 新增字段，存储创建者
      currentProjectIndex: null,
      showStatusSelect: false,
      selectedStatus: '',
    };
  },
  created() {
    this.fetchProjects();
  },
  methods: {
    toggleManage() {
      this.isShow = !this.isShow;
      this.isManaging = !this.isManaging;
    },
    goToProjectDetail(id) {
      this.$router.push({ name: 'ProgramDetail', params: { id }, query: { source: 'wofabu' } });
    },
    confirmExit(index) {
      this.showExitConfirm = true;
      this.currentProjectIndex = index;
    },
    cancelExit() {
      this.showExitConfirm = false;
    },
    async exitTeam(index) {
      const projectId = this.projects[index].id;
      try {
        // eslint-disable-next-line
        const response = await axios.delete(`http://localhost:3000/api/projects/${localStorage.getItem('loggedInUser')}/${projectId}`);
        alert("项目已解散！");
        this.projects.splice(index, 1);
        this.showExitConfirm = false;
      } catch (error) {
        console.error('解散项目失败', error);
      }
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
    async fetchProjects() {
      const username = localStorage.getItem('loggedInUser');
      try {
        const response = await axios.get(`http://localhost:3000/api/projects/${username}`);
        this.projects = response.data;
      } catch (error) {
        console.error('无法获取项目列表', error);
      }
    },
    editProject(index) {
      const project = this.projects[index];
      this.$router.push({
        name: 'FaBu',
        query: {
          id: project.id,
          title: project.title,
          num: project.num,
          startDate: project.startDate,
          skills: project.skills,
          content: project.content,
          category: project.category,
          subcategory: project.subcategory,
        },
      });
    },
    changeStatus(project, index) {
      this.selectedStatus = project.status || '招募中';
      this.showStatusSelect = true;
      this.currentProjectIndex = index;
    },
    async updateProjectStatus() {
      const project = this.projects[this.currentProjectIndex];
      project.status = this.selectedStatus;
      try {
        await axios.put(`http://localhost:3000/api/projects/${localStorage.getItem('loggedInUser')}/${project.id}`, project);
        alert('状态更新成功');
        this.showStatusSelect = false;
      } catch (error) {
        console.error('状态更新失败', error);
      }
    },
    cancelStatusChange() {
      this.showStatusSelect = false;
    },
    async removeMember(member) {
      if (this.currentProjectIndex === null) {
        console.error('当前项目索引未设置');
        return;
      }

      const projectId = this.projects[this.currentProjectIndex].id; // 获取当前项目的 ID
      const username = localStorage.getItem('loggedInUser');

      try {
        await axios.put(`http://localhost:3000/api/projects/removeMember/${username}/${projectId}`, { member });
        this.currentMembers = this.currentMembers.filter(m => m !== member); // 更新当前成员列表
        alert(`${member} 已被删除`);
      } catch (error) {
        console.error('删除成员失败', error);
      }
    },
  },
};
</script>




  
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
li{
    list-style: none;
    border: none;
}
a{
    text-decoration: none;
    border: none;
}
body {
  width: 100%;
  background-color: #fbeaff;
}
#guanli{
  width: 80px;
  height: 30px;
  margin-top: 20px;
  margin-left: 2.5%;
  /* border: none; */
}
.list .items {
  width: 95%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  margin: 20px auto;
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
  margin-bottom: 10px;
  margin-right: 5px;
}

.list .items .title h3{
  flex: 1;
  padding: 0 0 10px 15px;
}

.modal {
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
}

/* .list .items  h3{

} */
</style>