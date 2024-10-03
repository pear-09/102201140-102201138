<template>
  <!--底部内容的框-->
 <div class="rounded-rectangle"></div>
 <div class="gerenjianjie">
  <textarea v-model="inputData1" placeholder="请输入数据" @input="saveData1" rows="4" cols="50"></textarea>
 </div>
 <div class="hobby">
  <textarea v-model="inputData2" placeholder="请输入数据" @input="saveData2" rows="4" cols="50"></textarea>
 </div>

 <router-view></router-view>
</template>

<script>
export default {
  name: 'jianjie',
  data() {
    return {
      inputData1: localStorage.getItem('inputData1') || '' ,// 从LocalStorage获取数据
      inputData2: localStorage.getItem('inputData2') || '' // 从LocalStorage获取数据
    }
  },
  methods: {
    saveData1() {
      localStorage.setItem('inputData1', this.inputData1) // 保存数据到LocalStorage
    },
    saveData2() {
      localStorage.setItem('inputData2', this.inputData2) // 保存数据到LocalStorage
    }
  }
};
</script>

<style scoped>
.rounded-rectangle {
  display: block;
  border: 1px solid #0c0c0c;
  border-radius: 20px;
  width: 1200px;
  height: 400px;
  background-color: #dee6dd;
  /* margin-left: auto;
  margin-right: auto; */
  position: relative;
  top: 60px;
  left: 50%;
  transform: translate(-50%);
}
.gerenjianjie textarea {
  border: 1px solid #ccc; /* 边框颜色 */
  border-radius: 5px; /* 边框圆角 */
  font-size: 18px; /* 字体大小 */
  color: #000000; /* 字体颜色 */
  background-color: #f8f8f8; /* 背景颜色 */
  padding: 5px; /* 内边距 */
  width: 1150px; /* 宽度 */
  height: 150px; /* 高度 */
  z-index: 1; /* 设置一个较高的z-index值 */
  position: relative; /* 确保z-index生效 */
  left: 5%;
  top: -320px;
  resize: vertical; /* 允许垂直调整大小 */
}
.hobby textarea {
  border: 1px solid #ccc; /* 边框颜色 */
  border-radius: 5px; /* 边框圆角 */
  font-size: 18px; /* 字体大小 */
  color: #000000; /* 字体颜色 */
  background-color: #f8f8f8; /* 背景颜色 */
  padding: 5px; /* 内边距 */
  width: 1150px; /* 宽度 */
  height: 150px; /* 高度 */
  z-index: 1; /* 设置一个较高的z-index值 */
  position: relative; /* 确保z-index生效 */
  left: 5%;
  top: -320px;
  resize: vertical; /* 允许垂直调整大小 */
}

textarea::placeholder {
  color: #aaa; /* 占位符颜色 */
}
</style>
