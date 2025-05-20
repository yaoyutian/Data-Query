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
