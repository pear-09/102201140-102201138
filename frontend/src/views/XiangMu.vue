<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li><RouterLink to="/xiangmu/wofabu" active-class="active">我的项目(发布)</RouterLink></li>
        <li><RouterLink to="/xiangmu/wocanyu" active-class="active">我的项目(参与)</RouterLink></li>
        <li><RouterLink to="/xiangmu/woshenqing" active-class="active">申请状态</RouterLink></li>
        <li><RouterLink to="/xiangmu/woshenghe" active-class="active">组队审核</RouterLink></li>
      
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

<style scoped>
#app .nav {
width: 100%;
height: 45px;
z-index: 2;
margin-top: 10px;
/* border-bottom:solid 3px #f3e7b0; */
background-color: #f8f7f4;
}

#app .nav ul{
width: 95%;
height: 45px;
margin: 0 auto;
display: flex;
align-items: center;
z-index: 2;
/* margin-left: 2%; */
/* background-color: aqua; */

}

#app .nav ul li{
margin: 0 18px;
z-index: 2;
/* background-color: antiquewhite; */
}
#app .nav ul li a{
position: relative;
z-index: 2;
color: black;
}

#app .nav ul li a::after{
content: ' ';
position: absolute;
top: 50%;
left: 50%;
width: 100%;
height: 90%;
padding: 11px 15px;
border-radius: 10px;
background-color:#f7c73a;
transform: translate(-50%,-50%);
z-index: -1;
opacity: 0;
}

#app .nav ul li a.active::after{
opacity: 1;
}

#app .nav ul li a.active {
color: #fff;
}

#app .nav ul li a:hover::after{
opacity: 1;
transition: all .4s;
}

#app .content{
width: 100%;
height: 700px;
/* margin: 20px auto; */
/* background-color:#e5e3e0; */
}
</style>