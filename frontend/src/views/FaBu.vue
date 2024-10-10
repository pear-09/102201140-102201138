<template>
  <div id="app">
    <div class="main">
      <div class="content">
        <div class="title">
          <form @submit.prevent="isEditing ? submitUpdatedProject() : submitNewProject()">
            <label for="name">项目名称：</label>
            <input type="text" id="name" v-model="title" required />
            <br />
            <label for="num">项目人数：</label>
            <input type="number" id="num" v-model="num" required />
            <br />
            <label for="date">开始日期：</label>
            <input type="date" id="date" v-model="date" required />
            <br />
            <label for="jineng">技能方向：</label>
            <input type="text" id="jineng" v-model="jineng" />
            <br />
            <label for="">项目分类:</label>
            <select id="category" v-model="category" @change="updateSubcategories" required>
              <option v-for="(subcategories, key) in categories" :key="key" :value="key">{{ key }}</option>
            </select>
            <label for="">子分类：</label>
            <select id="subcategory" v-model="subcategory" required>
              <option v-for="sub in subcategories" :key="sub">{{ sub }}</option>
            </select>
          </form>
        </div>
        <div class="info">
          <textarea v-model="content" placeholder="请输入详细信息......"></textarea>
          <button @click="isEditing ? submitUpdatedProject() : submitNewProject()">
            {{ isEditing ? '更新' : '发布' }}
          </button>
          <button @click="resetForm">清空</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

let currentId = 0; // 全局变量，管理项目 ID

export default {
  name: 'FaBu',
  data() {
    return {
      title: '',
      num: '',
      date: '',
      jineng: '',
      content: '',
      category: '',
      subcategory: '',
      isEditing: false,
      categories: {
        '创业': ['科技创业', '文化创业', '农业创业', '服务创业'],
        '竞赛': ['学科技术类', '创新创业类', '文化艺术类', '服务外包类'],
        '学术科研': ['自然科学', '工程技术', '医学科学', '人文社会科学'],
      },
      subcategories: [],
    };
  },
  created() {
    const projectData = this.$route.query;
    if (projectData && projectData.id) {
      this.title = projectData.title || '';
      this.num = projectData.num || '';
      this.date = projectData.startDate || '';
      this.jineng = projectData.skills || '';
      this.content = projectData.content || '';
      this.category = projectData.category || '';
      this.subcategory = projectData.subcategory || '';
      this.isEditing = true;
      this.subcategories = this.categories[this.category];
      currentId = Number(projectData.id);
      console.log('当前项目 ID:', currentId);
    }
  },
  methods: {
    updateSubcategories() {
      this.subcategories = this.categories[this.category];
      this.subcategory = this.subcategories.length > 0 ? this.subcategories[0] : '';
    },
    async submitNewProject() {
        if (!this.title || !this.num || !this.date || !this.category || !this.subcategory) {
            alert('请填写所有必填字段！');
            return;
        }

        // 获取已登录的用户名
        const username = localStorage.getItem('loggedInUser');

        // 使用当前时间戳生成唯一 ID
        const projectData = {
            id: Date.now(), // 使用时间戳作为 ID
            title: this.title,
            num: this.num,
            members: [],
            category: this.category,
            subcategory: this.subcategory,
            startDate: this.date,
            skills: this.jineng,
            content: this.content,
            status: '招募中', // 默认状态为"招募中"
        };

        const userProjectData = {
            username: username,
            projects: [projectData],
            joinRequests: [],
            sentRequests: [],
            alert: [],
        };

        try {
          // eslint-disable-next-line
            const response = await axios.post('http://localhost:3000/api/projects', userProjectData);
            alert('项目发布成功');
            this.resetForm(); // 清空表单
        } catch (error) {
            console.error('项目发布失败', error);
            if (error.response) {
                alert(`项目发布失败: ${error.response.data.error || '未知错误'}`);
            } else {
                alert('网络错误，请检查服务器是否运行。');
            }
        }
    },
    async submitUpdatedProject() {
      if (!this.title || !this.num || !this.date || !this.category || !this.subcategory) {
        alert('请填写所有必填字段！');
        return;
      }

      const updatedProjectData = {
        id: currentId,
        title: this.title,
        num: this.num,
        category: this.category,
        subcategory: this.subcategory,
        startDate: this.date,
        skills: this.jineng,
        content: this.content,
      };

      try {
        await axios.put(`http://localhost:3000/api/projects/${localStorage.getItem('loggedInUser')}/${currentId}`, updatedProjectData);
        alert('项目更新成功');
        this.resetForm();
      } catch (error) {
        console.error('项目更新失败', error);
        alert(`项目更新失败: ${error.response.data.error || '未知错误'}`);
      }
    },

    resetForm() {
      this.title = '';
      this.num = '';
      this.date = '';
      this.jineng = '';
      this.content = '';
      this.category = '';
      this.subcategory = '';
      this.subcategories = [];
      this.isEditing = false;
      currentId = 0;
    },
  },
};
</script>


  
  

<style scoped>
#app .main{
    width: 100%;
    height: 900px;
}

#app .main .content{
    width: 100%;
    /* margin-top: 10px; */
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* border-top: solid 20px #f7c73a; */
    background-color:#f8f7f4;
    /* border-radius: 20px; */
}

#app .main .content .title{
    width: 100%;
    height: 30%;
    margin-bottom: 10px;
    /* background-color: wheat; */
}

#app .main .content .title form {
    margin-left: 140px;
    margin-top: 50px;
}

#app .main .content .title label{
  font-size: large;
}

#app .main .content .title form input{
    width: 260px;
    height: 28px;
    margin: 10px 0;
    border: solid 1px #ded8d8;
    outline: none;
    padding: 0 10px;
}

#app .main .content .title form select{
    width: 250px;
    height: 28px;
    margin: 10px 20px 0 8px; 
    border: solid 1px #ded8d8;
    outline: none;
    padding: 0 10px;
}

#app .main .content .info{
    width: 100%;
    height: 70%;
    margin-top:40px ;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: end;
    /* background-color:brown; */
}

#app .main .content .info textarea{
    width: 80%;
    height: 80%;
    position:absolute;
    top: 10px;
    padding: 10px;
    outline: none;
    border: solid 1px #ded8d8;
    font-size: 16px;
    /* border-radius: 1%; */
}


#app .main .content .info button{
    width: 60px;
    height: 45px;
    position: absolute;
    bottom: 20px;
    color:#333;
    font-weight: 700;
    background-color: #F2C078;

    border: none;
    border-radius: 10px;
    
    letter-spacing: 2px;
}

#app .main .content .info button:hover{
  /* background-color:#0d0c21d4; */
  background-color: #f0a844;

}


#app .main .content .info button:nth-child(2){
  width: 150px;
  font-size: 18px;
}


#app .main .content .info button:nth-child(3){
  width: 80px;
  height: 40px;
  right: 140px;
}



</style>