<template>
    <div id="app">
        <div class="search">
            <div class="search-box">
                <input type="text">
                <button>搜索</button>
            </div>
        </div>
        <div class="carousel">
            <img src="" alt="">
            <a href="#" id="prev" class="left">
                <img src="../assets/prev.png" alt="">
            </a>
            <a href="#" id="next" class="right">
                <img src="../assets/next.png" alt="">
            </a>
            <ul>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>
        <div class="programs">
            <div class="program" v-for="(project, index) in projects" :key="index" @click="goToProjectDetail(project.id)">
                <p class="content">{{ project.content }}</p>
                <div class="title">
                    <span>
                        <!-- 可在这里显示用户名或其他信息 -->
                    </span>
                    <h2>{{ project.title }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'ShouYe',
    data() {
        return {
            projects: [], // 用于存储项目列表
        };
    },
    created() {
        this.fetchProjects(); // 在组件创建时获取项目数据
    },
    methods: {
        async fetchProjects() {
            try {
                const response = await axios.get('http://localhost:3000/api/home-projects');
                this.projects = response.data; // 将获取的数据存储在 projects 中
            } catch (error) {
                console.error('无法获取项目列表', error);
            }
        },
        goToProjectDetail(id) {
            // 使用 id 跳转到项目详情
            this.$router.push({ name: 'ProgramDetail', params: { id }, query: { source: 'home' } });
        },
    },
}
</script>

<style>
/* 这里可以添加样式 */
</style>




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
#app .search{
    margin-bottom: 40px;
    padding: 30px 0;
}
#app .search .search-box{
    width: 500px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}
#app .search .search-box button{
    width: 60px;
    height: 45px;
    line-height: 45px;
    padding: 0 15px;
    border: none;
    box-sizing: border-box;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    
}
#app .search .search-box input{
    flex:1;
    height: 45px;
    line-height: 45px;
    border: none;
    box-sizing: border-box;
    outline: none;
    border-radius: 10px 0 0 10px;
    padding: 0 20px;
    transition: all .3s;
}
#app .search-box input:focus{
    box-shadow: 0 0 5px #eee;
}
#app .carousel{
    width: 1000px;
    height: 400px;
    position: relative;
    margin: 30px auto;
}
#app .carousel>img{
    width: inherit;
    height: inherit;
    display: block;
    background-color: pink;
}

#app .carousel a { 
    opacity: 0.2;
}


#app .carousel a img{ 
    width: 45px;
    height: 100px;
    position: absolute;
    top:50%;
    margin-top: -50px;
}

#app .carousel .left img{
    left: 0px;
}

#app .carousel .right img{
    right: 0px;
}
#app .carousel a:hover{
    opacity: 0.5;
}

#app .carousel ul li {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin: 0 5px;
    background-color: #fff;
    border-radius: 100%;
}

#app .carousel ul {
    position: absolute;
    right: 410px;
    bottom: 40px;
}

#app .programs {
    width: 90%;
    height: 800px;
    display: flex;
    justify-content:space-between;
    flex-wrap: wrap;
    margin: 60px auto;
    /* background-color: aqua; */

}

#app .programs .program{
    width: 400px;
    height: 180px;
    background-color: #fff;
}

#app .programs .program .content{
    width: 100%;
    height: 65%;
    padding: 8px;
    letter-spacing:2px;
    font: normal 400 16px '微软雅黑';
    overflow: hidden;
    display: -webkit-box; /* 需要使用盒子模型 */
    -webkit-box-orient: vertical; /* 垂直排列 */
    -webkit-line-clamp: 5; /* 设置显示的行数，这里为 5 行 */
    text-overflow: ellipsis; /* 加上省略号 */
    text-indent: 2em;
    background-color: #fff;
    margin: 5px 0;
}

#app .programs .program .title{
    width: 100%;
    height: 35%;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    border-top: 1px solid gainsboro;
}

#app .programs .program .title span{
    width: 80px;
    text-align: center;
}

#app .programs .program .title h2{
    transform: translateY(15px);
    /* text-align: center; */
    flex:1;
    
}

/* #app .programs .area div:hover{
    transform: translateY(-10px);
} */


#app .programs .line{
    width: 2px;
    height: inherit;
    background-color:gray;
}
</style>