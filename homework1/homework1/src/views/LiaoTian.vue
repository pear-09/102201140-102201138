<template>
    <div class="chat-container" v-if="isLoggedIn">
        <div class="user-list">
            <div 
                v-for="user in users" 
                :key="user"
                class="user-item" 
                @click="selectUser(user)"
                :class="{ active: selectedUser && selectedUser === user }"
            >
                {{ user }}
            </div>
        </div>
        <div class="chat-area">
            <div class="chat-header">
                <h2 v-if="selectedUser">与 {{ selectedUser }} 聊天</h2>
                <h2 v-else>请选择一个用户聊天</h2>
            </div>
            <ul class="messages">
                <li v-for="(msg, index) in chatMessages" :key="index">
                    <span :class="{ 'my-message': msg.from === currentUser }">
                        {{ msg.from === currentUser ? '我' : msg.from }}: {{ msg.content }}
                    </span>
                </li>
            </ul>
            <form @submit.prevent="sendMessage" class="message-form" v-if="selectedUser">
                <input v-model="input" placeholder="输入你的消息..." />
                <button type="submit">发送</button>
            </form>
        </div>
    </div>
    <div v-else>
        <p>请先登录才能聊天。</p>
    </div>
  </template>
  
  <script>
  import { ref, watch } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'LiaoTian',
    setup() {
        const users = ref(['user1', 'user2', 'user3']);
        const selectedUser = ref(null);
        const chatMessages = ref([]);
        const input = ref('');
        
        const isLoggedIn = ref(!!localStorage.getItem('loggedInUser')); // 检查用户是否已登录
        const currentUser = localStorage.getItem('loggedInUser');
  
        const selectUser = (user) => {
            selectedUser.value = user;
            loadChatMessages(currentUser, user); // 加载聊天记录
        };
  
        const loadChatMessages = async (user1, user2) => {
            try {
                const response = await axios.get(`http://localhost:3000/chat/${user1}/${user2}`);
                chatMessages.value = response.data; // 更新聊天记录
                // 按时间戳排序消息
                chatMessages.value.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            } catch (error) {
                console.error('加载聊天记录失败:', error);
            }
        };
  
        const sendMessage = async () => {
            if (input.value && selectedUser.value) {
                const messageContent = input.value;
  
                // 发送者为当前用户
                const message = {
                    from: currentUser,
                    content: messageContent,
                    timestamp: new Date().toISOString(), // 添加时间戳
                };
  
                // 将消息插入到 chatMessages 的末尾
                chatMessages.value.push(message);
  
                // 发送消息到后端并保存
                try {
                    await axios.post('http://localhost:3000/chat', {
                        user1: currentUser,
                        user2: selectedUser.value,
                        message: messageContent,
                        timestamp: message.timestamp,
                    });
  
                    // 发送消息后，更新聊天记录
                    loadChatMessages(currentUser, selectedUser.value);
                    input.value = ''; // 清空输入框
                } catch (error) {
                    console.error('发送消息失败:', error);
                }
            }
        };
  
        // 监视选中的用户，当用户变化时加载聊天记录
        watch(selectedUser, (newUser) => {
            if (newUser) {
                loadChatMessages(currentUser, newUser);
            }
        });
  
        return {
            users,
            selectedUser,
            chatMessages,
            input,
            selectUser,
            sendMessage,
            isLoggedIn,
            currentUser
        };
    },
  };
  </script>
  
  <style scoped>
  .chat-container {
    display: flex;
    width: 1400px; /* 保持原始宽度 */
    height: 700px; /* 保持原始高度 */
    margin: 10px auto; /* 中心对齐 */
    border-radius: 12px; /* 圆角 */
    overflow: hidden; /* 防止内容溢出 */
    background-color: #f9f9f9; /* 浅灰色背景 */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* 微弱阴影效果 */
  }
  
  .user-list {
    width: 250px; /* 保持用户列表宽度 */
    border-right: 1px solid #d0d0d0; /* 较轻的边框 */
    padding: 10px;
    background-color: #ffffff; /* 白色背景 */
  }
  
  .user-item {
    padding: 12px; /* 增加内边距 */
    margin: 5px 0;
    background-color: #e6e6e6; /* 浅灰色背景 */
    cursor: pointer;
    border-radius: 8px; /* 圆角 */
    transition: background-color 0.3s; /* 平滑过渡 */
  }
  
  .user-item.active {
    background-color: #007bff; /* 选中时的蓝色背景 */
    color: white; /* 选中时的文字颜色 */
  }
  
  .chat-area {
    flex: 1;
    padding: 20px; /* 增加内边距 */
    background-color: #ffffff; /* 白色背景 */
  }
  
  .chat-header {
    background-color: #007bff; /* 蓝色背景 */
    color: white; /* 白色文字 */
    padding: 15px; /* 增加内边距 */
    text-align: center;
    font-size: 1.2em; /* 增加字体大小 */
  }
  
  .messages {
    list-style: none;
    padding: 10px;
    height: 500px; /* 保持高度 */
    overflow-y: auto;
    margin: 0;
  }
  
  .messages li {
    padding: 10px; /* 增加内边距 */
    margin: 5px 0;
    border-radius: 12px; /* 圆角 */
    transition: background-color 0.3s; /* 平滑过渡 */
  }
  
  .messages li:nth-child(odd) {
    background-color: #f2f2f2; /* 更浅的灰色背景 */
  }
  
  .messages li:nth-child(even) {
    background-color: #eaeaea; /* 更深的灰色背景 */
  }
  
  .message-form {
    display: flex;
    padding: 15px;
    background-color: #f9f9f9; /* 浅灰色背景 */
    margin-top: -30px; /* 顶部间距 */
    border-top: 1px solid #d0d0d0; /* 边框 */
  }
  
  .message-form input {
    flex: 1;
    padding: 12px; /* 增加内边距 */
    border: 1px solid #ccc;
    border-radius: 8px; /* 圆角 */
    margin-right: 10px; /* 右边距 */
  }
  
  .message-form button {
    padding: 12px;
    border: none;
    background-color: #007bff; /* 蓝色背景 */
    color: white; /* 白色文字 */
    border-radius: 8px; /* 圆角 */
    cursor: pointer;
    transition: background-color 0.3s; /* 平滑过渡 */
  }
  
  .message-form button:hover {
    background-color: #0056b3; /* 悬停时的深蓝色 */
  }
  
  </style>
  
  