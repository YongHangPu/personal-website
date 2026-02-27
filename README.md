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

3. **构建生产版本**

```bash
pnpm run build
```

## 如何更新内容

- **简历内容**：修改 `src/data/resume.json` 文件。
- **项目列表**：修改 `src/data/projects.json` 文件。
