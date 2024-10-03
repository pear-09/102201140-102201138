<template>
    <div>
      <h1>项目详情</h1>
      <div v-if="project">
        <h2>{{ project.title }}</h2>
        <p>{{ project.description }}</p>
        <!-- 可以添加其他项目详细信息 -->
      </div>
      <p v-else>加载中...</p> <!-- 加载状态 -->
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProjectDetail',
    data() {
      return {
        project: null, // 存储项目详细信息
      };
    },
    methods: {
      async fetchProjectDetails() {
        const response = await fetch(`http://localhost:3000/projects/${this.$route.params.id}`);
        this.project = await response.json();
      },
    },
    mounted() {
      this.fetchProjectDetails(); // 组件加载时获取项目详情
    },
  };
  </script>
  
  <style scoped>
  /* 在此处添加项目详情页的样式 */
  </style>
  