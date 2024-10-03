<template>
  
  <div class = "Personalinformation">
    <router-link to="/personalinformation">个人资料</router-link>
    
  </div>
  <div>
    <h1>首页项目列表</h1>
    <ul>
      <li v-for="project in limitedProjects" :key="project.title">
        {{ project.title }} - {{ project.progress }}%
      </li>
    </ul>
  </div>
  
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState({
      projects: state => state.projects
    }),
    limitedProjects() {
      // 只显示部分项目
      return this.projects.slice(0, 5); // 显示前 5 个项目
    }
  }
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 50px;
}
.Personalinformation{
  position: absolute;
  top:100px;
  left: 20px;

}
</style>
