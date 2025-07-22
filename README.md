# 数据搜集网站架构说明

## 1. 项目结构

- frontend/  前端（Next.js + TypeScript）
- backend/   后端（Express + TypeScript）

## 2. 技术选型
- 前端：Next.js, React, TypeScript, Ant Design, Axios
- 后端：Node.js, Express, TypeScript, JWT, Multer, TypeORM/Prisma, Winston, Morgan
- 数据库：PostgreSQL/MySQL
- 文件存储：本地/OSS/S3

## 3. 功能模块
- 用户注册/登录（JWT鉴权）
- 文档上传（支持pdf, word, excel, epub, markdown等）
- 标签管理与文档分类
- 文档与标签的关联
- 日志与监控

## 4. 扩展性规划
- 支持大文件分片上传
- 分布式存储与负载均衡
- 多租户与权限体系

## 5. 目录结构建议
```
/data-query
  /frontend  # Next.js前端
  /backend   # Node.js后端
```

---

后续可根据此架构逐步扩展各模块。

# 快速运行前后端脚手架代码的方法如下：

## 1. 启动后端（Express + TypeScript）

推荐直接运行 TypeScript 版本（`app.ts`/`bin/www.ts`），如未编译可用 ts-node：

```powershell
# 进入 backend 目录
cd backend

# 安装依赖（如未安装）
npm install

# 运行 TypeScript 入口（需全局或本地 ts-node）
npx ts-node ./bin/www.ts
```

如需运行原生 JavaScript 版本（app.js/www）：

```powershell
# 进入 backend 目录
cd backend

# 安装依赖
npm install

# 运行
npm start
```

## 2. 启动前端（Next.js）

```powershell
# 进入 frontend 目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 3. 访问

- 前端访问：http://localhost:3000
- 后端 API 访问：http://localhost:3001/api

如需数据库支持或 .env 配置，请补充相关环境变量。  
如遇端口冲突或报错，可根据提示调整端口或依赖。

如需自动化一键启动，可在根目录编写简单的 PowerShell 脚本或使用 `concurrently` 工具。需要示例请告知。


安装依赖：typeorm、multer、winston、axios、pdf-parse、mammoth、xlsx、tesseract.js 等。