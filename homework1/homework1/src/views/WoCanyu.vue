<template>
  <div id="wo-canyu">
    <h1>我的项目</h1>
    <div v-if="projects.length === 0">没有参与的项目</div>
    <div v-else>
      <div class="list">
        <!-- eslint-disable-next-line -->
        <div class="items" v-for="(project, index) in projects" :key="project.id">
          <h3 @click="goToProjectDetail(project.id)">{{ project.title }}</h3>
          <p>{{ project.content }}</p>
          <button @click="leaveProject(project.id)">退出项目</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WoCanyu',
  data() {
    return {
      projects: []
    };
  },
  created() {
    this.fetchUserProjects();
  },
  methods: {
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
#wo-canyu {
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
}
</style>
