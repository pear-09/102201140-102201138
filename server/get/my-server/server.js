const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 固定用户列表
const validUsers = ['user1', 'user2', 'user3'];
const chatData = {}; // 用于存储聊天记录

const projects = []; // 存储所有项目
let projectIdCounter = 1; // 初始化项目 ID 计数器

// 登录用户
app.post('/login', (req, res) => {
    const { username } = req.body;

    // 检查用户是否在有效用户列表中
    if (validUsers.includes(username)) {
        return res.status(200).json({ message: '登录成功' });
    }

    return res.status(400).json({ message: '用户不存在' });
});

// 读取聊天记录
app.get('/chat/:user1/:user2', (req, res) => {
    const { user1, user2 } = req.params;
    const chatKey1 = `${user1}_${user2}`;
    const chatKey2 = `${user2}_${user1}`; // 反向聊天记录

    // 获取聊天记录
    const messages = (chatData[chatKey1] || []).concat(chatData[chatKey2] || []);
    res.json(messages);
});

// 发送消息
app.post('/chat', (req, res) => {
    const { user1, user2, message, timestamp } = req.body; // 添加 timestamp 参数
    const chatKey = `${user1}_${user2}`;

    // 初始化聊天记录
    if (!chatData[chatKey]) {
        chatData[chatKey] = [];
    }
    // 保存消息和发送者及时间戳
    chatData[chatKey].push({ from: user1, content: message, timestamp }); 

    res.status(200).json({ message: '消息已保存' });
});

// 获取所有项目或根据子类别获取项目
app.get('/projects', (req, res) => {
    const { subCategory } = req.query;
    if (subCategory) {
        const filteredProjects = projects.filter(project => project.subCategory === subCategory);
        res.json(filteredProjects);
    } else {
        res.json(projects); // 如果没有子类别参数，返回所有项目
    }
});

// 创建新项目
app.post('/projects', (req, res) => {
    const { title, maxParticipants, startDate, skills, category, subCategory, description, creator } = req.body;

    if (!title || !maxParticipants || !startDate || !skills || !category || !subCategory || !description || !creator) {
        return res.status(400).json({ message: '请完整填写所有项目信息' });
    }

    const newProject = {
        id: projectIdCounter++, // 为新项目分配一个唯一的 ID
        title,
        maxParticipants,
        startDate,
        skills,
        category,
        subCategory,
        description,
        creator,
        members: [creator], // 创建者自动加入项目
        applicants: []
    };

    projects.push(newProject);
    res.status(201).json({ message: '项目创建成功', project: newProject });
});

// 获取项目详情
app.get('/projects/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = projects.find(p => p.id === projectId);
    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: '项目未找到' });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在运行，端口: ${PORT}`);
});
