<template>
  <div class="discover-container">
    <div class="sidebar">
      <div class="rounded-rectangle">
        <!-- 创业 -->
        <div class="setup">
          <button type="button" class="button" @click="toggleSubcategory('创业')">创业</button>
          <div class="content" v-if="expandedCategory === '创业'">
            <a href="#" @click.prevent="selectSubcategory('科技创业')">科技创业</a>
            <a href="#" @click.prevent="selectSubcategory('文化创业')">文化创业</a>
            <a href="#" @click.prevent="selectSubcategory('农业创业')">农业创业</a>
            <a href="#" @click.prevent="selectSubcategory('服务创业')">服务创业</a>
          </div>
        </div>

        <!-- 竞赛 -->
        <div class="competition">
          <button type="button" class="button" @click="toggleSubcategory('竞赛')">竞赛</button>
          <div class="content" v-if="expandedCategory === '竞赛'">
            <a href="#" @click.prevent="selectSubcategory('学科技术类')">学科技术类</a>
            <a href="#" @click.prevent="selectSubcategory('创新创业类')">创新创业类</a>
            <a href="#" @click.prevent="selectSubcategory('文化艺术类')">文化艺术类</a>
            <a href="#" @click.prevent="selectSubcategory('服务外包类')">服务外包类</a>
          </div>
        </div>

        <!-- 学术科研 -->
        <div class="academic">
          <button type="button" class="button" @click="toggleSubcategory('学术科研')">学术科研</button>
          <div class="content" v-if="expandedCategory === '学术科研'">
            <a href="#" @click.prevent="selectSubcategory('自然科学')">自然科学</a>
            <a href="#" @click.prevent="selectSubcategory('工程技术')">工程技术</a>
            <a href="#" @click.prevent="selectSubcategory('医学科学')">医学科学</a>
            <a href="#" @click.prevent="selectSubcategory('人文社会科学')">人文社会科学</a>
          </div>
        </div>
      </div>
    </div>

    <div class="projects">
      <h2>项目列表 - {{ selectedSubcategory }}</h2>
      <ul>
  <li v-for="project in filteredProjects" :key="project.id" @click="goToProject(project.id)" class="project-card">
    <h3>{{ project.title }}</h3>
    <p>{{ project.content }}</p> <!-- 修改为显示内容 -->
  </li>
</ul>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FaXian',
  data() {
    return {
      expandedCategory: null,
      selectedSubcategory: null,
      projects: []
    };
  },
  computed: {
    filteredProjects() {
      return this.projects.filter(project => project.subcategory === this.selectedSubcategory);
    }
  },
  methods: {
    toggleSubcategory(category) {
      this.expandedCategory = this.expandedCategory === category ? null : category;
    },
    selectSubcategory(subcategory) {
      this.selectedSubcategory = subcategory;
      this.loadProjects();
    },
    async loadProjects() {
      const response = await fetch(`http://localhost:3000/projects?subcategory=${this.selectedSubcategory}`);
      this.projects = await response.json();
    },
    goToProject(id) {
      this.$router.push(`/project/${id}`);
    }
  },
  mounted() {
    this.loadProjects();
  }
};
</script>
  
  <style scoped>
  .discover-container {
    display: flex;
    background-color: #f9f9f9; /* 页面背景色 */
  }
  
  .sidebar {
    width: 260px;
    height: auto; /* 自适应高度 */
    background-color: #fff; /* 侧边栏背景色 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 侧边栏阴影 */
    border-radius: 10px; /* 边框圆角 */
    padding: 20px; /* 增加内边距 */
  }
  
  .rounded-rectangle {
    border: 1px solid #e0e0e0; /* 边框颜色 */
    border-radius: 15px; /* 圆角 */
    padding: 20px; /* 增加内边距，调整高度 */
    background-color: #f7f7f7; /* 背景色 */
    margin: 15px;
  }
  
  .projects {
    flex-grow: 1;
    padding-left: 20px;
  }
  
  .button {
    background-color: #007aff; /* 按钮背景色 */
    color: #fff; /* 按钮文字颜色 */
    width: 100%; /* 按钮宽度 */
    height: 50px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    margin-bottom: 15px; /* 增加按钮之间的间距 */
    border-radius: 5px; /* 按钮圆角 */
    transition: background-color 0.3s; /* 按钮背景色过渡 */
  }
  
  .button:hover {
    background-color: #0051a8; /* 按钮悬停背景色 */
  }
  
  .content {
    display: block;
  }
  
  .project-card {
    border: 1px solid #ddd; /* 项目卡片边框 */
    border-radius: 8px; /* 项目卡片圆角 */
    padding: 15px;
    margin-bottom: 15px;
    background-color: #fff; /* 项目卡片背景色 */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 项目卡片阴影 */
    cursor: pointer;
    transition: transform 0.2s; /* 卡片过渡效果 */
  }
  
  .project-card:hover {
    transform: translateY(-2px); /* 悬停效果 */
  }
  
  .content a {
    padding: 10px;
    text-decoration: none;
    display: block;
    font-size: 16px;
    color: #333; /* 链接颜色 */
  }
  
  .content a:hover {
    color: #007aff; /* 链接悬停颜色 */
  }
  </style>
  