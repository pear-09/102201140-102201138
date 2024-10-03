<template>
  <!--下拉菜单背景的圆角矩形-->
  <div class="rounded-rectangle"><router-view></router-view></div>


  <!-- 创业下拉菜单的实现-->
  <div class="setup">
    <router-view></router-view>
    <button type="button" class="button">
     创业
    </button>
    <div class="content">
      <!-- <ul>
        <li><router-link to="/discoverDetails/科技创业">科技创业</router-link></li>
        <li><router-link to="/discoverDetails/餐饮创业">餐饮创业</router-link></li>
        <li><router-link to="/discoverDetails/文化创业">文化创业</router-link></li>
        <li><router-link to="/discoverDetails/农业创业">农业创业</router-link></li>
        <li><router-link to="/discoverDetails/零售创业">零售创业</router-link></li>
        <li><router-link to="/discoverDetails/服务创业">服务创业</router-link></li>
      </ul> -->
      <a href="#">科技创业</a>
      <a href="#">餐饮创业</a>
      <a href="#">文化创业</a>
      <a href="#">农业创业</a>
      <a href="#">零售创业</a>
      <a href="#">服务创业</a>
    </div>
  </div> 

  <!-- 竞赛下拉菜单的实现-->
  <div class="competition">
    <button type="button" class="button">
     竞赛
    </button>
    <div class="content">
      <!-- <ul>
        <li><router-link to="/discoverDetails/学科技术类">学科技术类</router-link></li>
        <li><router-link to="/discoverDetails/创新创业类">创新创业类</router-link></li>
        <li><router-link to="/discoverDetails/专业技能类">专业技能类</router-link></li>
        <li><router-link to="/discoverDetails/文化艺术类">文化艺术类</router-link></li>
        <li><router-link to="/discoverDetails/服务外包类">服务外包类</router-link></li>
        <li><router-link to="/discoverDetails/信息技术类">信息技术类</router-link></li>
      </ul> -->
      <a href="#">学科技术类</a>
      <a href="#">创新创业类</a>
      <a href="#">专业技能类</a>
      <a href="#">文化艺术类</a>
      <a href="#">服务外包类</a>
      <a href="#">信息技术类</a>
    </div>
  </div> 
  <!-- 学术科研下拉菜单的实现-->
  <div class="academic">
    <button type="button" class="button">
     学术科研
    </button>
    <div class="content">
      <!-- <ul>
        <li><router-link to="/discoverDetails/自然科学">自然科学</router-link></li>
        <li><router-link to="/discoverDetails/工程技术">工程技术</router-link></li>
        <li><router-link to="/discoverDetails/医学科学">医学科学</router-link></li>
        <li><router-link to="/discoverDetails/人文社会科学">人文社会科学</router-link></li>
      </ul> -->
      <a href="#">自然科学</a>
      <a href="#">工程技术</a>
      <a href="#">医学科学</a>
      <a href="#">人文社会科学</a>
    </div>
  </div>

</template>

<script>
export default {
  name: 'LeftSidebar'
}

</script>

<style scoped>
.setup {
position: relative;
top: 100px;
display: block;

}
.competition {
position: absolute;
top: 400px;
display: block;

}
.academic {
position: absolute;
top: 600px;
display: block;

}
.setup button {
  background-color: rgb(213, 145, 145);
  color: rgb(21, 20, 20);
  width: 252px;
  height: 50px;
  padding: 5px;
  font-size: 20px;
  border: none;
  cursor: pointer; 
  position: relative;
  left: 11px;
  top: 15px;
}
.competition button {
  background-color: rgb(213, 145, 145);
  color: rgb(21, 20, 20);
  width: 252px;
  height: 50px;
  padding: 5px;
  font-size: 20px;
  border: none;
  cursor: pointer; 
  position: absolute;
  left: 11px;
  top: 15px;
}
.academic button {
  background-color: rgb(213, 145, 145);
  color: rgb(21, 20, 20);
  width: 252px;
  height: 50px;
  padding: 5px;
  font-size: 20px;
  border: none;
  cursor: pointer; 
  position: absolute;
  left: 11px;
  top: 15px;
}
.competition:hover .content {
  display: block;
 
}
.setup:hover .content {
  display: block;
 
}
.academic:hover .content {
  display: block;
 
}
.content {
  display: none;
  width: 252px;
  background-color: #f9f9f9;
  min-width: 95px;
  box-shadow: none;
  position: relative;
  left: 11px;
  /* transform: translateX(-50%); */
  top: 15px;
  z-index: 2;
}

.content a {
  /* color: black;
  text-align: center;
  text-decoration: none;
  display: block;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 0px; */
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: center;
  font-size: 18px;
}
.content a:hover{
  color:rgb(241,1,128)
}


.rounded-rectangle {
  border: 1px solid #9d9b9b;
  border-radius: 20px;
  width: 250px;
  height: 700px;
  background-color: #f6f4f4;
  margin: 10px;
  position:absolute;
  top:100px;
  left: 10px;
}


</style>