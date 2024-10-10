<template>
    <div id="mask">
        <form action="">
            <h1>注册</h1>
            <div class="xuanze">
            身份：
            <input type="radio" name="identity" checked>学生
            <input type="radio" name="identity">教师
            <br>
            性别：
            <input type="radio" name="sex" checked>男
            <input type="radio" name="sex">女
            </div>
            <div class="tianxie">
            <input type="text" id="username" placeholder="用户名">     
            <input type="text" name="" id="s_id" placeholder="学号">
            <input type="text" id="grade" placeholder="年级">
            <input type="text" id="major" placeholder="专业">
            <input type="text" name="" id="email" placeholder="邮箱">
            <input type="password" name="" id="password" placeholder="密码">
            <input type="password" name="" id="confirm" placeholder="确认密码">
            <input type="text" name="" id="phone" placeholder="手机号">
            <div class="yanzhengma">
                <input type="text" placeholder="请输入验证码"><button>获取验证码</button>
            </div>
            </div>
            <button>注册</button>
            <div class="foot">
                
                
                    <span>已有账号？
                        <a href="#">去登录</a>
                    </span>
                    <span><a href="#">忘记密码</a></span>
                
            </div>
        </form>
    </div>
</template>

<script>

export default {
    name:'ZhuCe',
    

}
</script>

<style scoped>
#mask{
    width:600px;
    height: 1000px;
    margin: 0 auto;
    background-color:bisque;
}

#mask form input{
    padding: 0 10px;
}

#mask form {
    width: 300px;
    height: 800px;
    margin: 0 auto;
}

#mask form h1{
    width: 300px;
    height: 100px;
    line-height: 100px;
    text-align: center;
}

#mask form .xuanze {
    width: 300px;
    height: 90px;
}

#mask form .tianxie{
    width: 300px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
}

#mask form .xuanze input{
    margin:10px;
}

#mask form .tianxie>input{
    width: 300px;
    height: 40px;
    border: none;
    box-sizing: border-box;
    outline: none;
} 

#mask form .tianxie .yanzhengma{
    width: 300px;
    height: 35px;
    display: flex;
    justify-content: space-between;
}

#mask form .tianxie .yanzhengma input{
    flex:1;
    margin-right:3px ;
    height: 30px;
    border: none;
    box-sizing: border-box;
    outline: none;
}

#mask form .tianxie .yanzhengma button{
    width: 80px;
    height: 30px;
    border: none;
}

#mask form>button{
    width: 300px;
    height: 40px;
    margin-top: 30px;
    border: none;
}

#mask form .foot {
    width: 300px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>