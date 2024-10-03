<template>
    <!-- 导航栏 -->
    <div id="app">
        <div class="UserHeader">
            <div class="logo">
                FZU跨福专
            </div>
            <div class="navy">
                <ul>
                    <li><RouterLink to="/" active-class="active">首页</RouterLink></li>
                    <li><RouterLink to="/discover" active-class="active">发现</RouterLink></li>
                    <li><RouterLink to="/post" active-class="active">发布</RouterLink></li>
                    <li><router-link to="/messages">消息</router-link></li>
                    <li><RouterLink to="/userlogin" active-class="active">登录/注册</RouterLink></li>
                </ul>
            </div>
        </div>
    </div>
     <!-- 展示区 -->
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { RouterView ,RouterLink} from 'vue-router';
export default {
    name:'UserHeader',
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
#app .UserHeader{
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    background-color:#b39cd0;
}

#app .UserHeader .logo{
    width:600px;
    height: 100%;
    padding: 0 20px;
    margin-left: 10px;
    color: #fff;
    margin-top: 10px;
    /* background-color: aquamarine; */
    font:normal 800 22px '微软雅黑';
}

#app .UserHeader .navy{
    width: 100%;
    height: 60px;
    display: flex;
    justify-content:flex-end;
    align-items: end;
}

#app .UserHeader .navy ul li{
    display: inline-block;
    /* margin-top: 18px; */
    margin-right: 35px;
}

#app .UserHeader .navy ul li a{
    position: relative;
    font: normal 400 18px '微软雅黑';
    color: #fff;
    /* background-color:#fbeaff; */
    z-index: 2;
}

#app .UserHeader .navy a::after{
    content: ' ';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 100%;
    height: 50%;
    padding: 11px 15px;
    border-radius: 4px;
    background-color:#845ec2;
    transform: translate(-50%,-50%);
    z-index: -1;
    opacity: 0;
}

#app .UserHeader .navy a.active::after{
    top:50%;
    opacity: 1;
}


#app .UserHeader .navy li a:hover::after{
    top:50%;
    opacity: 1;
    transition: all .4s;
}
</style>