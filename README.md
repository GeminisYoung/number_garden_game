# 🌱 数字花园

一个结合数学学习与游戏化种植的 Web 应用！通过解答数学题来解锁植物，建造属于你的美丽花园。

## ✨ 功能特点

- 🧮 三种难度的数学题（简单/中等/困难）
- 🌻 6种可爱的植物等你解锁
- 🌱 植物生长系统，看着它们长大
- 💾 自动保存进度
- 🎨 美观的界面，轻松上手

## 🚀 如何运行

### 1. 安装 Node.js

首先需要安装 Node.js（推荐 LTS 版本）：
- 访问 [nodejs.org](https://nodejs.org/)
- 下载并安装 LTS 版本

### 2. 安装依赖

打开命令行，进入项目目录，运行：

```bash
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

然后浏览器会自动打开，或者访问 `http://localhost:3000`

### 4. 构建生产版本（可选）

```bash
npm run build
```

## 🎮 游戏说明

1. 点击花园的空位选择植物种植
2. 做数学题答对可以解锁新植物
3. 点击已种植的植物可以施肥生长（需要再答对数学题）
4. 收集所有植物，建造美丽的花园！

## 🛠️ 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **IndexedDB** - 本地数据存储

## 📁 项目结构

```
digital-garden/
├── src/
│   ├── components/      # React 组件
│   ├── data/           # 数据和存储
│   ├── game/           # 游戏逻辑
│   ├── hooks/          # React Hooks
│   ├── App.tsx         # 主应用
│   └── main.tsx        # 入口文件
└── package.json
```

## 📄 许可证

MIT License - 完全免费！
