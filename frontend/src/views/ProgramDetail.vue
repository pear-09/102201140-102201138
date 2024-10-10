<template>
  <div id="app">
    <Header>
      <h1>{{ project.title || '加载中...' }}</h1>
    </Header>
    <div class="main" v-if="project.title">
      <div class="content">
        <p><strong>项目负责人:</strong> {{ project.creator }}</p>
        <p><strong>状态:</strong> <span :class="statusClass">{{ project.status }}</span></p>
        <p><strong>开始日期:</strong> {{ project.startDate }}</p>
        <p><strong>项目人数:</strong> {{ project.num }}</p>
        <p><strong>技能需求:</strong> {{ project.skills }}</p>
        <strong>项目描述:</strong>
        <p> {{ project.content }}</p>
        <button 
          @click="applyToJoin" 
          :disabled="project.members && project.members.length >= project.num">
          {{ project.members && project.members.length >= project.num ? '成员已满' : '申请加入' }}
        </button>
      </div>
      <div class="slider">
        <img src="../assets/hezuo.svg" alt="Project Image" class="project-img" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProgramDetail',
  data() {
    return {
      project: {}
    };
  },
  created() {
    this.fetchProjectDetail();
  },
  methods: {
    async fetchProjectDetail() {
      const projectId = Number(this.$route.params.id);  
      const url = `http://localhost:3000/api/project/${projectId}`; 

      try {
        const response = await axios.get(url);
        this.project = response.data; 
      } catch (error) {
        console.error('获取项目详情失败', error); 
      }
    },
    applyToJoin() {
      const projectId = Number(this.$route.params.id); 
      const username = localStorage.getItem('loggedInUser');

      const { num, members } = this.project;

      if (members && members.length >= num) {
        alert('项目成员已满，无法申请加入。'); 
      } else {
        axios.post(`http://localhost:3000/api/project/${projectId}/apply`, { userId: username })
          .then(response => {
            alert(response.data.message); 
          })
          .catch(error => {
            console.error('申请加入失败', error);
            alert(error.response?.data.message || '申请加入失败，请重试。'); 
          });
      }
    }
  },
  computed: {
    statusClass() {
      return {
        'status-active': this.project.status === '进行中',
        'status-completed': this.project.status === '已完成',
        'status-recruiting': this.project.status === '招募中'
      };
    }
  }
}
</script>

<style scoped>
#app header {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 150px;
  background-color: #f8f7f4;
  color: black;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

#app .main {
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 20px auto;
  padding: 20px;
  border-radius: 15px;
  background-color: #f5f5f5;
}

#app .main .content {
  width: 65%;
  padding: 20px;
  background-color: #fff8dc;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s; /* 添加过渡效果 */
}


#app .main .content p {
  margin: 10px 0;
  line-height: 1.6;
}

#app .main .content button {
  display: block;
  width: 120px;
  padding: 10px;
  margin: 20px 0;
  background-color: #F2C078;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s; /* 添加背景色过渡 */
}

#app .main .content button:hover {
  background-color: #f0a844; /* 悬停效果 */
}

#app .main .content button:disabled {
  background-color: #d3d3d3;
  cursor: not-allowed;
}

#app .main .slider {
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #faf0e6;
  border-radius: 15px;
}

#app .main .slider .project-img {
  width: 90%;
  border-radius: 15px;
  object-fit: cover;
}

.status-active {
  color: green; /* 进行中状态颜色 */
}

.status-completed {
  color: gray; /* 已完成状态颜色 */
}

.status-recruiting {
  color: orange; /* 招募中状态颜色 */
}
</style>
