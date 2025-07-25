民航适航大模型 MaaS 平台 PRD（产品需求文档）

## 一、项目背景与目标
本项目旨在构建一个面向民航领域的 MaaS（Model as a Service）平台，汇聚适航规章、审定文档等知识，形成高质量适航数据集，并基于该数据集进行大模型微调与部署。平台支持数据收集、数据集生成、模型训练与评测等全流程，助力民航适航智能化应用。

## 二、核心功能模块
### 1. 数据收集模块
数据文件上传：支持多格式文档（PDF、Word、Excel、EPUB、Markdown等）上传。
文档识别与文本提取：自动识别文档类型，提取结构化文本。
导出 Markdown：将识别后的内容导出为 Markdown 格式。
标签分类：对文档进行标签化管理，便于后续检索与分类。
### 2. 数据集生成模块
数据来源选择：支持多渠道数据源选择（本地、云端、第三方接口）。
数据去重与清理：自动去除重复内容，清理无效数据。
语义流畅处理：对文本进行语义优化，提升数据质量。
数据集导出：支持导出为标准格式（如 JSON、CSV、Markdown）。
### 3. 模型微调训练模块
超参数配置：前端可视化配置训练参数（如学习率、batch size、epoch等）。
训练任务管理：支持任务创建、进度监控、日志查看。
训练框架集成：后端集成 ms-swift 框架，支持分布式训练。
训练结果管理：保存训练模型、评估指标、日志等。
### 4. 模型部署与评测模块
模型在线部署：支持微调模型一键部署，API调用。
对话评测：前端支持与模型对话，后端集成 transformers 库进行推理。
评测指标展示：展示模型评测结果（如准确率、流畅度等）。
### 5. 用户与权限系统
用户注册/登录：支持 JWT 鉴权，安全管理用户信息。
权限管理：区分普通用户、管理员等角色，控制功能访问。
### 6. 日志与监控系统
操作日志：记录用户操作、系统事件。
训练与评测日志：详细记录模型训练、评测过程。
系统监控：可扩展接入 Prometheus/Grafana。
## 三、非功能性需求
高可用性：支持分布式部署，保证系统稳定。
可扩展性：模块化设计，便于后续功能扩展。
安全性：数据加密传输，权限细粒度控制。
易用性：前端交互友好，操作流程清晰。
性能要求：支持大规模数据处理与模型训练。
架构设计文档
### 1. 技术选型
前端：Next.js + TypeScript + Ant Design
后端：Node.js (TypeScript) + Express（API服务、用户系统、数据管理）
Python（模型训练、评测，ms-swift、transformers集成）
数据库：PostgreSQL/MySQL（结构化数据）、对象存储（文档文件）
日志：Winston（Node.js）、Python logging
训练框架：ms-swift（模型训练）、transformers（推理评测）
### 2.系统架构图
┌─────────────┐
│  前端 Web   │
│ Next.js/TS │
└─────┬───────┘
      │ RESTful API
┌─────▼─────────────┐
│   后端 Node.js    │
│ Express/TS        │
│ 用户/数据/日志    │
└─────┬─────────────┘
      │ gRPC/REST
┌─────▼─────────────┐
│   后端 Python     │
│ ms-swift/transformers │
│ 训练/推理/评测    │
└─────┬─────────────┘
      │
┌─────▼─────────────┐
│   数据库/存储     │
│ PostgreSQL/MySQL  │
│ OSS/S3/本地存储   │
└───────────────────┘
### 3.目录结构建议
/maas-platform
  /frontend      # Next.js + TypeScript
  /backend
    /node        # Express + TypeScript
    /python      # ms-swift, transformers
  /docs          # 项目文档
  /scripts       # 部署/运维脚本
  /data          # 数据集/样例
### 4. 关键流程说明
数据收集流程
用户登录后上传文档
后端 Node.js 接收文件，存储至对象存储
文档识别与文本提取（可调用 Python 服务）
结果返回前端，支持导出 Markdown
数据集生成流程
用户选择数据源、配置清理规则
后端进行去重、清理、语义优化
生成高质量数据集，支持导出
模型训练流程
用户在前端配置训练参数，提交训练任务
Node.js 后端转发任务至 Python 服务（ms-swift）
Python 后端执行训练，实时回传日志与进度
训练完成后保存模型与评估结果
模型评测与部署流程
用户选择模型进行部署
后端 Python 部署模型，开放 API
前端支持对话评测，展示评测指标
### 5. 日志与监控
前后端均集成日志系统，关键操作与异常均有记录
训练与评测过程日志详细可追溯
可扩展接入监控平台（Prometheus/Grafana）
### 6. 安全与权限
用户系统采用 JWT 鉴权
文件与数据传输加密
训练与评测任务仅限授权用户操作
### 7. 迭代与扩展建议
支持大文件分片上传与断点续传
多租户体系，支持企业级应用
训练任务分布式调度与资源管理
模型评测指标可自定义扩展