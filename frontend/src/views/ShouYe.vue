<template>
    <div id="app">
        <!-- 搜索框 -->
        <div class="search">
            <div class="search-box">
                <input type="text" placeholder="输入关键词搜索">
                <button>搜索</button>
            </div>
        </div>

        <!-- 轮播图 -->
        <div class="carousel">
            <img :src="carouselImages[currentIndex]" alt="轮播图">
            <a href="#" id="prev" class="left" @click.prevent="prevImage">
                <img src="../assets/prev.png" alt="prev">
            </a>
            <a href="#" id="next" class="right" @click.prevent="nextImage">
                <img src="../assets/next.png" alt="next">
            </a>
            <ul>
                <li v-for="(image, index) in carouselImages" :key="index" :class="{active: index === currentIndex}" @click="goToImage(index)"></li>
            </ul>
        </div>

        <!-- 项目展示区 -->
        <div class="programs">
            <div class="program" v-for="(project, index) in projects" :key="index" @click="goToProjectDetail(project)">
                <div class="title">
                    <h2>{{ project.title }}</h2>
                    <p class="user"><strong>{{ project.creator }}</strong></p>
                </div>
                <p class="content">{{ project.content }}</p>
                <div class="details">
                    <p class="status">状态: {{ project.status }}</p>
                    <p class="skills">技能: {{ project.skills }}</p>
                    <p class="startDate">开始日期: {{ project.startDate }}</p>
                </div>
            </div>
        </div>
    </div>
</template>


  
<script>
export default {
    name: 'ShouYe',
    data() {
        return {
            currentIndex: 0, // 当前轮播图索引
            carouselImages: [
                "image1.jpg",
                'image2.jpg',
                'image3.jpg'
            ],
            projects: [
                {
                    title: "智慧校园管理系统",
                    num: 2,
                    status: "进行中",
                    startDate: "2024-10-11",
                    skills: "大数据，前端开发，后端开发",
                    creator: "我爱学习",
                    content: "随着信息技术的不断进步，智慧校园的理念逐渐被各大高校接受。该项目旨在开发一个全面的校园管理系统，功能包括课程管理、学生信息查询、教室预约、图书馆资源整合等。"
                },
                {
                    title: "医疗健康管理平台",
                    num: 5,
                    status: "已完成",
                    startDate: "2024-10-20",
                    skills: "健康数据分析, 数据可视化, 移动应用开发, 后端开发",
                    creator: "健康守护者",
                    content: "该项目目标是开发一个面向个人和医疗机构的健康管理平台，涵盖电子病历管理、在线咨询、健康数据监控、预约挂号等功能。"
                },
                {
                    title: "社区服务管理系统",
                    num: 6,
                    status: "进行中",
                    startDate: "2024-11-10",
                    skills: "前端开发, 后端开发, 用户体验设计, 数据库管理",
                    creator: "社区建设者",
                    content: "本项目旨在开发一个社区服务管理系统，帮助社区居民更方便地获取各类服务信息。系统将包括物业管理、社区公告、居民反馈、志愿者服务等功能模块。居民可以通过平台在线提交报修请求、查看公告信息，并参与社区活动。平台还将提供志愿者招募与服务信息，促进社区的团结与互助。"
                },
                {
                    title: "智能家居控制系统",
                    num: 3,
                    status: "已完成",
                    startDate: "2024-11-05",
                    skills: "物联网, 嵌入式系统, 云计算, 前端开发",
                    creator: "未来之家",
                    content: "该项目旨在开发一个智能家居控制系统，支持用户通过手机或语音助手远程控制家中的各种电器设备，如灯光、空调、安防设备等。系统集成了物联网技术与云计算，可以实时监控家居环境并根据用户的设置进行智能调节。项目的最终目标是提高居家生活的智能化程度，提升用户的生活便利性和安全性。"
                },
                {
                    title: "编程马拉松竞赛",
                    num: 5,
                    status: "进行中",
                    startDate: "2024-12-01",
                    skills: "算法设计, 数据结构, 编程语言, 团队协作",
                    creator: "代码狂热者",
                    content: "这是一个面向编程爱好者的编程马拉松竞赛，参赛者需要在规定的时间内完成一系列具有挑战性的编程任务。比赛主要考察参赛者的算法设计、数据结构应用及快速编程能力。比赛还鼓励团队合作，参赛者可以组队参与，面对复杂问题时分工合作，共同解决。优胜者将获得丰厚的奖励和行业知名公司的推荐机会。"
                },
                {
                    title: "人工智能图像识别系统",
                    num: 4,
                    status: "已完成",
                    startDate: "2024-10-25",
                    skills: "机器学习, 图像处理, 深度学习, Python",
                    creator: "AI先锋",
                    content: "本项目致力于开发一个基于人工智能的图像识别系统，能够对各种类型的图像进行识别和分类。系统将使用深度学习算法训练神经网络模型，从海量的图像数据中提取特征，实现高效、精准的识别。该系统可广泛应用于安防、医疗影像分析、自动驾驶等领域，提升相关行业的效率和智能化水平。"
                },
                {
                    title: "移动端游戏开发大赛",
                    num: 6,
                    status: "进行中",
                    startDate: "2024-11-20",
                    skills: "游戏引擎开发, 移动端开发, UI/UX设计, 3D建模",
                    creator: "游戏开发者联盟",
                    content: "移动端游戏开发大赛旨在发掘和培养优秀的游戏开发者。参赛者需要在规定的时间内设计并开发一款移动端游戏，比赛要求游戏具备创新性、趣味性和良好的用户体验。参赛者可以选择使用任意游戏引擎进行开发，并需注重游戏的流畅度和视觉效果。比赛的优胜者将有机会与知名游戏公司合作或获得资金支持，推动游戏项目的进一步发展。"
                },
                {
                    title: "智慧城市物联网解决方案",
                    num: 5,
                    status: "已完成",
                    startDate: "2024-12-10",
                    skills: "物联网, 数据分析, 网络安全, 云平台",
                    creator: "城市创新者",
                    content: "智慧城市物联网解决方案项目旨在通过物联网技术实现城市管理的数字化和智能化。系统包括智能交通、环境监测、公共安全等多个模块，能够实时收集和分析城市中的各种数据，提供智能决策支持。项目的目标是提升城市的运作效率，降低能源消耗，改善居民的生活质量。通过部署云平台和加强网络安全，确保数据的安全性和可扩展性。"
                },
                {
                    title: "机器人编程竞赛",
                    num: 4,
                    status: "进行中",
                    startDate: "2024-11-15",
                    skills: "机器人控制, 传感器应用, Python, 机械设计",
                    creator: "机器人爱好者",
                    content: "机器人编程竞赛面向机器人开发与编程爱好者，参赛者需要设计并编程控制一台机器人完成指定任务。比赛任务包括障碍物躲避、路径规划、目标识别等。参赛者将通过使用多种传感器和算法来增强机器人的自主能力。比赛不仅考验编程能力，还要求对硬件的深刻理解和创新思维，优胜者将有机会参与更多机器人领域的高端项目。"
                }
            ],
        };
    },
    methods: {
        nextImage() {
            this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
            console.log(this.currentIndex);
        },
        prevImage() {
            this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
        },
        goToImage(index) {
            this.currentIndex = index;
        },
        goToProjectDetail(project) {
            console.log('Navigating to project detail:', project); // 打印项目对象
            this.$router.push({ 
            name: 'HomeProjectDetail', 
            params: { project: JSON.stringify(project) } 
        });
}
    },
    mounted() {
        setInterval(this.nextImage, 5000); // 每5秒自动轮播
    }
};
</script>

  

<style scoped>
body {
    width: 100%;
    background-color: #f8f7f4;
    font-family: 'Arial', sans-serif; /* 设置字体 */
}

#app .search {
    margin-bottom: 40px;
    padding: 30px 0;
}

#app .search .search-box {
    width: 500px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
}

#app .search .search-box button {
    width: 60px;
    height: 45px;
    border: none;
    border-radius: 0 10px 10px 0;
    cursor: pointer;
    background-color: #f7c73a;
    color: white;
    font-weight: bold;
    transition: background-color 0.3s;
}

#app .search .search-box button:hover {
    background-color: #f7c83acc;
}

#app .search .search-box input {
    flex: 1;
    height: 45px;
    border: none;
    border-radius: 10px 0 0 10px;
    padding: 0 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    outline: none;
}

#app .carousel {
    width: 1000px;
    height: 400px;
    position: relative;
    margin: 30px auto;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px; /* 增加圆角 */
}

#app .carousel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px; /* 增加圆角 */
}

#app .carousel a img {
    width: 45px;
    height: 100px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    opacity: 0.3;
    transition: opacity 0.3s;
}

#app .carousel a img:hover {
    opacity: 0.8;
}

#app .carousel .left img {
    left: 0px;
}

#app .carousel .right img {
    right: 0px;
}

#app .carousel ul {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    list-style: none;
    padding: 0;
}

#app .carousel ul li {
    width: 12px;
    height: 12px;
    margin: 0 5px;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s;
}

#app .carousel ul li.active {
    background-color: #333;
}

#app .programs {
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 60px auto;
}

#app .program {
    width: 400px;
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s; /* 添加阴影变化 */
}

#app .program:hover {
    transform: translateY(-10px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* 添加悬停阴影 */
}

#app .program .title {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    margin-bottom: 5px;
}

#app .program .content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 24px;
    font-size: 16px;
    margin-bottom: 10px;
}

#app .program .details {
    font-size: 14px;
    color: #666; /* 设置文本颜色 */
}

#app .program .status, 
#app .program .skills, 
#app .program .startDate {
    margin-top: 5px;
}
</style>

