<template>
    <!--底部内容的框-->
   <div class="rounded-rectangle"></div>
   <router-view></router-view>
  </template>
  
  <script>
  export default {
    name: 'joinapply'
  };
  </script>
  
  <style scoped>
 .rounded-rectangle {
    display: block;
    border: 1px solid #0c0c0c;
    border-radius: 20px;
    width: 1200px;
    height: 400px;
    background-color: #bee0b8;
    /* margin-left: auto;
    margin-right: auto; */
    position: relative;
    top: 60px;
    left: 50%;
    transform: translate(-50%);
  }
  </style>
  