<template>
  
  <!-- <div class="navbar">
    <router-link to="/">首页</router-link>|
    <router-link to="/discover">发现</router-link>|
    <router-link to="/post">发布</router-link>|
    <router-link to="/message">消息</router-link>
  </div> -->
  <UserHeader/>
  <router-view :projects="projects" @addProject="addProject"></router-view>
</template>

<script>
import UserHeader from './views/UserHeader.vue';
export default {
  name: 'App',
  components:{
    UserHeader
  },
  data() {
    return {
      // 全局存储项目数据
      projects: []
    };
  },
  methods: {
    // 添加新项目
    addProject(newProject) {
      newProject.id = this.projects.length + 1; // 简单生成唯一 ID
      this.projects.push(newProject);
    }
  }
}
</script>

<style >

</style>
