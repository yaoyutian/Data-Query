# Copilot Instructions

- 遵循分层架构，前后端分离，接口RESTful。
- 代码风格统一，优先TypeScript。
- 日志、错误处理、权限校验需规范实现。
- 代码注释清晰，便于后续维护。
- 重要变更需更新README。


# 数据搜集网站架构说明
#new 我要实现一个数据搜集网站，用户使用账号登陆后，可上传常见文本类型文档（pdf,word,excel,epub,markdown等）并可对文档打标签分类，后台可根据类型、标签分类存储。该系统采集数据量后期会比较大，需提前做好规划。请帮我设计一下该软件的架构，包括前端、后端、日志，并初步编写一定量的脚手架代码，便于后续展开深入迭代。
你的需求是实现一个支持多种文档上传、标签分类、用户登录、后端高效存储和可扩展的数据搜集网站。下面是高层架构设计和项目初始化计划：

## 高层架构设计

1. 前端（Web）：
   - 技术栈：React（或 Next.js）、TypeScript、Ant Design（UI）、Axios（API请求）
   - 功能：用户注册/登录、文档上传（支持多格式）、标签管理、文档浏览与分类、进度与状态提示

2. 后端（API服务）：
   - 技术栈：Node.js（TypeScript）、Express.js、JWT鉴权、Multer（文件上传）、TypeORM/Prisma（数据库ORM）
   - 功能：用户管理、文档上传与解析、标签管理、文档与标签的关联、API接口、后台管理
   - 存储：对象存储（如本地/OSS/S3）、关系型数据库（如PostgreSQL/MySQL）

3. 日志与监控：
   - 日志：Winston（Node.js日志）、morgan（HTTP日志）
   - 监控：Prometheus + Grafana（可选，后期扩展）

4. 扩展性与规划：
   - 文件分片与断点续传（后期支持大文件）
   - 分布式存储与负载均衡
   - 多租户与权限体系

## 项目初始化计划

1. 使用 Next.js + TypeScript 初始化前端项目
2. 使用 Node.js + TypeScript + Express 初始化后端项目
3. 配置基础的用户认证、文档上传、标签管理接口
4. 日志中间件集成
5. 目录结构规划，便于后续扩展

---

### 高层目录结构建议

```
/data-query
  /frontend  # Next.js前端
  /backend   # Node.js后端
```

---

### 执行计划

1. 在当前目录下分别初始化 frontend（Next.js）和 backend（Node.js+Express）项目
2. 创建 .github/copilot-instructions.md 说明文件
3. 创建 README.md 项目说明
4. 配置基础依赖和脚手架代码

---

即将执行以下命令和操作：

- npx create-next-app@latest frontend --typescript
- npx express-generator backend --no-view --typescript
- 安装后端依赖（如 multer, winston, jsonwebtoken, typeorm/prisma 等）
- 创建 copilot-instructions.md 和 README.md

如无异议，将立即开始。

Made changes.

Made changes.

Continue to iterate?
Copilot has been working on this problem for a while. It can continue to iterate, or you can send a new message to refine your prompt.