# 个人网站项目说明

本项目是基于 Vue 3 + Vite + TypeScript + Element Plus 构建的个人展示网站。

## 目录结构

```
src/
  assets/       # 静态资源和样式
  components/   # 通用组件
  data/         # 数据文件 (简历和项目数据)
    resume.json   # 简历数据源
    projects.json # 开源项目数据源
  router/       # 路由配置
  views/        # 页面视图
    Home.vue      # 首页
    Resume.vue    # 简历页
    Projects.vue  # 项目页
```

## 快速开始

1. **安装依赖**

```bash
cd personal-website
pnpm install
```

2. **启动开发服务器**

```bash
pnpm run dev
```
启动后访问控制台输出的本地地址（通常是 http://localhost:5173）。

3. **构建生产版本**

```bash
pnpm run build
```

## 如何更新内容

- **简历内容**：修改 `src/data/resume.json` 文件。
- **项目列表**：修改 `src/data/projects.json` 文件。
- **周报/博客**：目前网站侧重于简历和项目展示。如果需要展示 `doc` 文件夹中的周报，建议编写一个 Node.js 脚本将 Markdown 文件转换为 JSON 格式，然后在前端进行渲染。
