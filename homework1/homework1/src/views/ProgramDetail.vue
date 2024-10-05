<template>
  <div id="app">
    <Header>
      <h1>{{ project.title || '加载中...' }}</h1>
    </Header>
    <div class="main" v-if="project.title"> 
      <div class="content">
        <p><strong>开始日期:</strong> {{ project.startDate }}</p>
        <p><strong>项目人数:</strong> {{ project.num }}</p>
        <p><strong>技能:</strong> {{ project.skills }}</p>
        <p><strong>内容:</strong> {{ project.content }}</p>
        <button @click="applyToJoin">申请加入</button> 
      </div>
      <div class="slider"></div>
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
    const username = localStorage.getItem('loggedInUser'); // 从 Local Storage 中获取用户名

    console.log('项目 ID:', projectId); // 打印项目 ID
    console.log('当前用户名:', username); // 打印用户名

    // 继续进行成员检查和申请逻辑
    const { num, members } = this.project; 

    if (members && members.length >= num) {
        alert('项目成员已满，无法申请加入。'); 
    } else {
        axios.post(`http://localhost:3000/api/project/${projectId}/apply`, { userId: username })
            .then(response => {
                alert(response.data.message); // 确保这里能正确获取消息
            })
            .catch(error => {
                console.error('申请加入失败', error);
                alert(error.response?.data.message || '申请加入失败，请重试。'); // 确保能够显示后端返回的具体错误消息
            });
    }
}




  }
}
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
#app header {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  padding-left: 150px;
  background-color: cadetblue;
}

#app .main{
    width: 80%;
    height: 400px;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
}

#app .main .content{
    width: 75%;
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 20px;
    margin-right: 20px;
    background-color:antiquewhite;
    border-radius: 30px;
}

#app .main .content h2{
    /* background-color: #fff; */
    margin: 20px 0 10px 45px;
}

#app .main .content p{
    width:90%;
    height: 70%;
    margin: 0 auto;
    background-color: #fff;
}

#app .main .content button{
    width: 100px;
    height: 30px;
    margin: 20px auto;
}

#app .main .slider{
    width: 25%;
    height: 400px;
    margin-top: 20px;
    border-radius: 30px;
    background-color: bisque;
}
</style>