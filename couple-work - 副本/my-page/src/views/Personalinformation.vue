<template>
   <!-- 头像 -->
   <div class="avatar">
    <img :src="imageUrl" alt="头像2" class="image2">
   </div>

   <div class="username">
    <p>用户名：</p>
   </div>
   <div class="id">
    <p>账号：</p>
   </div>
   <div class="major">
    <p>专业：</p>
   </div>
   <div class="skill">
    <p>技能：</p>
   </div>

   <div class="features">
    <div>
      <button type = "button" class = "settings">设置</button>
    </div>
    
    <button type = "button" class = "quit">退出</button>
   </div>

   <!--底部内容的框-->
   <div class="rounded-rectangle">
    <component :is="currentComponent"></component>
   </div>

   <!-- 个人简介按钮 -->
   <button type="button" class="button1" @click="showComponent('jianjie')" >
       个人简介
   </button>
   <!-- 账号设置按钮 -->
   <button type="button" class="button2" @click="showComponent('Projectprocess')">
       账号设置
   </button>
   <!-- 认证资料按钮 -->
   <button type="button" class="button3" @click="showComponent('joinapply')">
       认证资料
   </button>
</template>

<script>
import jianjie from '../views/jianjie.vue';
import joinapply from '../views/JoinApply.vue';
import ProjectProcess from './ProjectProcess.vue';

export default {
  components: {
    jianjie,
    ProjectProcess,
    joinapply
  },
  data() {
    return {
      currentComponent: jianjie, // 默认不显示任何组件
      imageUrl: require('@/assets/头像2.png') // 使用require确保图片被webpack处理
    };
  },
  methods: {
    showComponent(componentName) {
      this.currentComponent = componentName;
    }
  }
};
</script>

<style scoped>
.avatar {
  width: 120px;
  height: 120px;
  border: 1px solid#9d9b9b;
  border-radius: 50%;
  background: rgb(245, 241, 241);
  position: absolute;
  top: 100px;
  left: 80px;
}
.image2 {
  width: 150px;  /* 设置图片宽度 */
  height: 150px; /* 设置图片高度 */
  position: relative; /* 设置定位 */
  top: -15px;     /* 设置向上偏移 */
  left: -13px;    /* 设置向左偏移 */
}
.username {
    border: 1px solid #9d9b9b;
    border-radius: 20px;
    width: 250px;
    height: 50px;
    background-color: #f6f4f4;
    margin: 10px;
    position:absolute;
    top: 100px;
    left: 250px;
}
.id {
    border: 1px solid #9d9b9b;
    border-radius: 20px;
    width: 250px;
    height: 50px;
    background-color: #f6f4f4;
    margin: 10px;
    position:absolute;
    top: 100px;
    left: 600px;
}
.major {
    border: 1px solid #9d9b9b;
    border-radius: 20px;
    width: 250px;
    height: 50px;
    background-color: #f6f4f4;
    margin: 10px;
    position:absolute;
    top: 180px;
    left: 250px;
}
.skill {
    border: 1px solid #9d9b9b;
    border-radius: 20px;
    width: 250px;
    height: 50px;
    background-color: #f6f4f4;
    margin: 10px;
    position:absolute;
    top: 180px;
    left: 600px;
}
.settings {
    background-color: rgb(213, 145, 145);
    color: rgb(21, 20, 20);
    border-radius: 20px;
    width: 60px;
    height: 60px;
    padding: 5px;
    font-size: 18px;
    border: none;
    cursor: pointer; 
    position: absolute;
    top: 100px;
    right: 200px;
  }
.quit {
    background-color: rgb(213, 145, 145);
    color: rgb(21, 20, 20);
    border-radius: 20px;
    width: 60px;
    height: 60px;
    padding: 5px;
    font-size: 18px;
    border: none;
    cursor: pointer; 
    position: absolute;
    top: 100px;
    right: 60px;
  }

  .rounded-rectangle {
    display: block;
    border: 1px solid #9d9b9b;
    border-radius: 20px;
    width: 1300px;
    height: 500px;
    background-color: #f6f4f4;
    /* margin-left: auto;
    margin-right: auto; */
    position: absolute;
    top: 300px;
    left: 50%;
    transform: translate(-50%);
  }
  .button1{
    width: 200px;
    height: 50px;
    font-size: 18px;
    position: absolute;
    top: 300px;
    left: 200px;
  }
  .button2{
    width: 200px;
    height: 50px;
    font-size: 18px;
    position: absolute;
    top: 300px;
    left: 450px;
  }
  .button3{
    width: 200px;
    height: 50px;
    font-size: 18px;
    position: absolute;
    top: 300px;
    left: 700px;
  }
  p{
    padding: 5px;
    position: relative;
    left: 10px;
    top: -5px;
  }

</style>