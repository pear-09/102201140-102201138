<template>
  <div>
    <!-- 导航栏 -->
    <UserHeader />
    <!-- 展示区 -->
    <!-- <ShouYe /> -->
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
// import { RouterView ,RouterLink} from 'vue-router';

import UserHeader from './components/UserHeader'
// import ShouYe from './views/ShouYe'
// import FaBu from './views/FaBu'
// import DengLu from './views/DengLu'
// import ZhuCe from './views/ZhuCe'


export default {
  name: 'App',
  components: {
    UserHeader
  }
}
</script>

<style>
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
  background-color: #f8f7f4 !important;
}

</style>
