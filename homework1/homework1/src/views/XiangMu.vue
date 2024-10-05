<template>
    <div id="app">
      <div class="nav">
        <ul>
          <li><RouterLink to="/xiangmu/wofabu">我的项目(发布)</RouterLink></li>
          <li><RouterLink to="/xiangmu/wocanyu">我的项目(参与)</RouterLink></li>
          <li><RouterLink to="/xiangmu/woshenqing">申请状态</RouterLink></li>
          <li><RouterLink to="/xiangmu/woshenghe">组队审核</RouterLink></li>
          <li><RouterLink to="/xiangmu/xiaoxi">消息通知</RouterLink></li>
        </ul>
      </div>
      <div class="content">
        <RouterView />  
      </div>
    </div>
</template>
  
<script>
  export default {
    name: 'XiangMu',
    components: {
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
  background-color: #fbeaff;
}

#app .nav {
  width: 100%;
  height: 45px;
  background-color: #fff;
}

#app .nav ul{
  width: 95%;
  height: 45px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  /* margin-left: 2%; */
  /* background-color: aqua; */

}

#app .nav ul li{
  margin: 0 10px;
  background-color: antiquewhite;
}

#app .content{
  width: 95%;
  height: 700px;
  margin: 20px auto;
  background-color: antiquewhite;
}
</style>