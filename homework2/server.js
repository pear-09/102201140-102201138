const express = require('express'); 
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// 测试根路由
app.get('/', (req, res) => {
    res.send('后端服务器已启动');
});

// 获取首页项目列表
app.get('/api/home-projects', (req, res) => {
    fs.readFile('./data/homeProjects.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: '读取项目失败' });
        }
        try {
            const projects = JSON.parse(data);
            res.json(projects);
        } catch (parseError) {
            res.status(500).json({ error: '解析项目数据失败' });
        }
    });
});
// 读取 homeProjects.json 数据
const projectsData = JSON.parse(fs.readFileSync('./data/homeProjects.json', 'utf-8'));

// 创建一个路由获取单个项目详情
app.get('/api/homeProjects/:id', (req, res) => {
    const projectId = req.params.id;
    const project = projectsData.find(p => p.id === Number(projectId));
    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: '项目未找到' });
    }
});

// 发布新项目
app.post('/api/projects', (req, res) => {
    const newProject = req.body;

    // 读取当前项目数据
    fs.readFile('./data/projects.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: '读取项目失败' });
        }

        try {
            const projectsData = JSON.parse(data);

            // 添加新项目并保存
            projectsData.push(newProject);
            fs.writeFileSync('./data/projects.json', JSON.stringify(projectsData, null, 2));

            res.status(201).json({ message: '项目发布成功', project: newProject });
        } catch (parseError) {
            res.status(500).json({ error: '解析项目数据失败' });
        }
    });
});

// 获取所有项目
app.get('/api/projects', (req, res) => {
    fs.readFile('./data/projects.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: '读取项目失败' });
        }
        try {
            const projects = JSON.parse(data);
            res.json(projects);
        } catch (parseError) {
            res.status(500).json({ error: '解析项目数据失败' });
        }
    });
});
// 获取单个项目
app.get('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;

    fs.readFile('./data/projects.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: '读取项目失败' });
        }

        try {
            const projects = JSON.parse(data);
            const project = projects.find(p => p.id === Number(projectId)); // 假设项目对象有一个 id 属性

            if (!project) {
                return res.status(404).json({ error: '项目未找到' });
            }

            res.json(project);
        } catch (parseError) {
            res.status(500).json({ error: '解析项目数据失败' });
        }
    });
});
// 更新项目
app.put('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;
    const updatedProject = req.body;

    // 读取项目数据
    fs.readFile('./data/projects.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: '读取项目失败' });
        }

        try {
            const projectsData = JSON.parse(data);
            const projectIndex = projectsData.findIndex(proj => proj.id === Number(projectId));

            if (projectIndex !== -1) {
                // 更新项目数据
                projectsData[projectIndex] = { ...projectsData[projectIndex], ...updatedProject };
                fs.writeFileSync('./data/projects.json', JSON.stringify(projectsData, null, 2));
                res.status(200).json({ message: '项目更新成功' });
            } else {
                res.status(404).json({ error: '项目未找到' });
            }
        } catch (parseError) {
            res.status(500).json({ error: '解析项目数据失败' });
        }
    });
});

// 删除项目
app.delete('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;
    console.log('收到的删除请求项目ID:', projectId); // 输出调试信息
  
    fs.readFile('./data/projects.json', 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: '读取项目失败' });
      }
  
      try {
        let projectsData = JSON.parse(data);
        const originalLength = projectsData.length;
        projectsData = projectsData.filter(proj => proj.id !== Number(projectId));
  
        if (projectsData.length === originalLength) {
          return res.status(404).json({ error: '项目未找到' });
        }
  
        fs.writeFileSync('./data/projects.json', JSON.stringify(projectsData, null, 2));
        console.log('项目已删除，剩余项目:', projectsData); // 输出删除后的项目数据
        res.status(200).json({ message: '项目删除成功' });
      } catch (parseError) {
        res.status(500).json({ error: '解析项目数据失败' });
      }
    });
  });
  
  
// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器正在 http://localhost:${PORT} 上运行`);
});
