<template>
  <div class="project-detail" v-if="projectData">
    <div class="header">
      <h1>{{ projectData.title }}</h1>
      <p class="creator"><strong>发布者: {{ projectData.creator }}</strong></p>
      <p class="status">状态: <span :class="statusClass">{{ projectData.status }}</span></p>
      <p class="start-date"> <strong>开始日期:</strong>  {{ projectData.startDate }}</p>
      <p class="skills"> <strong>技能需求:</strong> {{ projectData.skills }}</p>
      <p class="num"><strong>团队人数:</strong> {{ projectData.num }}</p>
    </div>
    <div class="content">
      <p class="content-title">项目内容：</p>
      <p class="content-text">{{ projectData.content }}</p>
    </div>
  </div>
  <div v-else>
    <p class="not-found">项目未找到</p>
  </div>
</template>

<script>
export default {
  name: 'HomeProjectDetail',
  props: {
    project: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      projectData: null,
    };
  },
  created() {
    this.projectData = JSON.parse(this.project);
  },
  mounted() {
    console.log('Project:', this.project);
    console.log('Parsed Project:', this.projectData);
  },
};
</script>

<style scoped>
.project-detail {
  width: 90%;
  max-width: 800px; /* 限制最大宽度 */
  margin: 40px auto;
  margin-top: 100px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s; /* 添加动画效果 */
}



.header {
  margin-bottom: 25px;
}

.header h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #333; /* 主标题颜色 */
}

.header p {
  margin: 5px 0;
  color: #555; /* 副标题颜色 */
}

.header .status {
  font-weight: bold;
}

.statusClass {
  font-weight: bold;
  padding: 3px 5px;
  border-radius: 5px;
}

.statusClass:before {
  content: '';
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}

.statusClass:where(.进行中):before {
  background-color: #f39c12; /* 进行中的状态颜色 */
}

.statusClass:where(.已完成):before {
  background-color: #2ecc71; /* 已完成的状态颜色 */
}

.statusClass:where(.招募中):before {
  background-color: #e74c3c; /* 招募中的状态颜色 */
}

.content {
  font-size: 18px;
  line-height: 1.6;
  color: #333; /* 内容文本颜色 */
}

.content-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.content-text {
  text-indent: 2em;
  padding-left: 20px; /* 增加左边距 */
}

.not-found {
  text-align: center;
  font-size: 18px;
  color: #e74c3c; /* 错误信息颜色 */
}
</style>
