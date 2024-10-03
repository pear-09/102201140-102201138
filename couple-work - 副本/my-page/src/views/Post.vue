<template>
  <div>
    <h1>创建新项目</h1>
    <div v-if="!isLoggedIn">
      <p>请先登录才能发布项目。</p>
      <router-link to="/login">登录</router-link>
    </div>
    <form @submit.prevent="submitForm" v-if="isLoggedIn && !createdProject">
      <div>
        <label for="title">项目名称:</label>
        <input v-model="title" type="text" id="title" required>
      </div>

      <div>
        <label for="maxParticipants">项目人数:</label>
        <input v-model="maxParticipants" type="number" id="maxParticipants" required>
      </div>

      <div>
        <label for="startDate">开始日期:</label>
        <input v-model="startDate" type="date" id="startDate" required>
      </div>

      <div>
        <label for="skills">技能方向:</label>
        <input v-model="skills" type="text" id="skills" required>
      </div>

      <div>
        <label for="category">项目分类:</label>
        <select v-model="selectedCategory" @change="updateSubCategories" required>
          <option disabled value="">请选择分类</option>
          <option value="创业">创业</option>
          <option value="竞赛">竞赛</option>
          <option value="学术科研">学术科研</option>
        </select>
      </div>

      <div v-if="selectedCategory">
        <label for="subcategory">子分类:</label>
        <select v-model="selectedSubCategory" required>
          <option disabled value="">请选择子分类</option>
          <option v-for="subcategory in subCategories" :key="subcategory" :value="subcategory">{{ subcategory }}</option>
        </select>
      </div>

      <div>
        <label for="description">项目描述:</label>
        <textarea v-model="description" id="description" rows="4" required></textarea>
      </div>

      <button type="submit">提交项目</button>
    </form>

    <div v-if="createdProject">
      <h2>已创建的项目</h2>
      <p>标题: {{ createdProject.title }}</p>
      <p>人数: {{ createdProject.maxParticipants }}</p>
      <p>开始日期: {{ createdProject.startDate }}</p>
      <p>技能方向: {{ createdProject.skills }}</p>
      <p>分类: {{ createdProject.category }} - {{ createdProject.subCategory }}</p>
      <p>描述: {{ createdProject.description }}</p>
      <p>创建者: {{ createdProject.creator }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      maxParticipants: '',
      startDate: '',
      skills: '',
      selectedCategory: '',
      selectedSubCategory: '',
      description: '',
      subCategories: [],
      createdProject: null,
      currentUser: 'user2', // 假设用户为 user2
      isLoggedIn: false,
      categories: {
        '创业': ['科技创业', '文化创业', '农业创业', '服务创业'],
        '竞赛': ['学科技术类', '创新创业类', '文化艺术类', '服务外包类'],
        '学术科研': ['自然科学', '工程技术', '医学科学', '人文社会科学']
      }
    };
  },
  created() {
    const savedUser = localStorage.getItem('loggedInUser');
    this.isLoggedIn = !!savedUser;
  },
  methods: {
    updateSubCategories() {
      this.subCategories = this.categories[this.selectedCategory] || [];
    },
    async submitForm() {
      if (!this.isLoggedIn) {
        alert('请先登录才能发布项目。');
        return;
      }

      const newProject = {
        title: this.title,
        maxParticipants: this.maxParticipants,
        startDate: this.startDate,
        skills: this.skills,
        category: this.selectedCategory,
        subCategory: this.selectedSubCategory,
        description: this.description,
        creator: this.currentUser
      };

      try {
        const response = await fetch('http://localhost:3000/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newProject)
        });

        if (response.ok) {
          this.createdProject = newProject;
          alert('项目已成功创建！');
        } else {
          alert('创建项目失败！');
        }
      } catch (error) {
        console.error('创建项目失败:', error);
      }
    }
  }
};
</script>
