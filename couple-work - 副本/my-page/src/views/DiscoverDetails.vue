<template>
  <div class="discover">
    <h1>Discover Page</h1>
    <p>Welcome to the discover page.</p>
  </div>
  <div class="leftsidebar">
    <LeftSidebar/>
  <!--右边招募帖子的框-->
  <div class="rounded-rectangle"></div>

  </div>
</template>

<script>
import LeftSidebar from './LeftSidebar.vue';
export default {
  name: 'discover',
  components:{
    LeftSidebar
  }
  }
</script>

<style scoped>
  .leftsidebar {
    display: block;
  }
  .rounded-rectangle {
    border: 1px solid #9d9b9b;
    border-radius: 20px;
    width: 1100px;
    height: 700px;
    background-color: #f6f4f4;
    margin: 10px;
    position:absolute;
    top:160px;
    right:10px;
  }
</style>