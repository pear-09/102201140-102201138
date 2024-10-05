<template>
  <div id="app">
    <div class="main">
      <div class="sidebar">
        <ul class="function">
          <li><a href="#">编辑项目</a></li>
          <li><a href="#">历史项目</a></li>
          <li><a href="#">草稿箱</a></li>
          <li><a href="#">回收站</a></li>
        </ul>
      </div>
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
            项目分类:
            <select id="category" v-model="category" @change="updateSubcategories" required>
              <option v-for="(subcategories, key) in categories" :key="key" :value="key">{{ key }}</option>
            </select>
            子分类：
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
          <button @click="saveDraft">存草稿</button>
          <button @click="resetForm">丢弃</button>
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
    margin-top: 20px ;
    display: flex;
    justify-content: space-between;
}

#app .main .sidebar {
    width: 10%;
    height: inherit;
    margin-top: 20px;
    background-color: antiquewhite;
}

#app .main .sidebar .function li{
    /* width: 100%; */
    height: 50px;
    line-height: 50px;
    margin-bottom: 10px;
    text-align: center;
    /* background-color: aquamarine; */
}

#app .main .content{
    width: 90%;
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: transparent;
}


#app .main .content .column ul{
    width: 100%;
    height: 60px;
    position: relative;
    margin-bottom: 10px;
    /* background-color:pink; */
    display: flex;
    align-items: center;
}
#app .main .content .column ul li{
    width: 120px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    z-index: 1;
} 

#app .main .content .column ul li a{
    color: #fff;
}


#app .main .content .column .slider{
    width: 120px;
    height: 50px;
    position: absolute;
    top: 50%;
    margin-top: -25px;
    left: 0px;
    /* background-color: hotpink; */
    border-radius: 4px;
    z-index: 0;
    transition: all .3s;
}

#app .main .content .column li:nth-child(1):hover ~ .slider{
    left:0px;
}

#app .main .content .column li:nth-child(2):hover ~ .slider{
    left:120px;
}

#app .main .content .column li:nth-child(3):hover ~ .slider{
    left:240px;
}

#app .main .content .column li:nth-child(4):hover ~ .slider{
    left:360px;
}



#app .main .content .title{
    width: 100%;
    height: 30%;
    margin-bottom: 10px;
    /* background-color: wheat; */
}

#app .main .content .title form {
    margin-left: 25px;
    margin-top: 10px;
}

#app .main .content .title form input{
    width: 260px;
    height: 28px;
    margin: 10px 0;
    border: none;
    outline: none;
    padding: 0 10px;
}

#app .main .content .title form select{
    width: 250px;
    height: 28px;
    margin: 10px 20px 0 8px; 
    border: none;
    outline: none;
    padding: 0 10px;
}

#app .main .content .info{
    width: 100%;
    height: 70%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: end;
    /* background-color:brown; */
}

#app .main .content .info textarea{
    width: 96%;
    height: 88%;
    position:absolute;
    top: 10px;
    padding: 10px;
    outline: none;
    border: none;
    /* border-radius: 1%; */
}


#app .main .content .info button{
    width: 90px;
    height: 30px;
    position: absolute;
    bottom: 20px;
}


#app .main .content .info button:nth-child(2){
    width: 150px;
}



#app .main .content .info button:nth-child(3){
    right: 150px;
}

#app .main .content .info button:nth-child(4){
    right: 30px;
}

</style>