详细接口文档（RESTful API）

## 1. 用户模块
### 注册
POST /api/auth/register
请求体：{ username, password, email }
返回：{ userId, username, token }
### 登录
POST /api/auth/login
请求体：{ username, password }
返回：{ userId, username, token }
### 获取当前用户信息
GET /api/auth/me
Header: Authorization: Bearer <token>
返回：{ userId, username, email, roles }
## 2. 文档模块
### 上传文档
POST /api/documents/upload
Header: Authorization: Bearer <token>
FormData: file, tags（可选，数组）
返回：{ documentId, filename, status }
### 获取文档列表
GET /api/documents
查询参数：?tag=xxx&type=pdf&page=1&pageSize=20
返回：[{ documentId, filename, type, tags, uploader, createdAt }]
### 获取单个文档详情
GET /api/documents/:id
返回：{ documentId, filename, type, tags, content, uploader, createdAt }
### 删除文档
DELETE /api/documents/:id
Header: Authorization: Bearer <token>
返回：{ success: true }
### 导出文档为 Markdown
GET /api/documents/:id/export
返回：{ markdown: "..." }
## 3. 标签模块
### 创建标签
POST /api/tags
Header: Authorization: Bearer <token>
请求体：{ name }
返回：{ tagId, name }
### 获取标签列表
GET /api/tags
返回：[{ tagId, name }]
### 删除标签
DELETE /api/tags/:id
Header: Authorization: Bearer <token>
返回：{ success: true }
## 4. 数据集生成模块
### 生成数据集
POST /api/dataset/generate
Header: Authorization: Bearer <token>
请求体：{ sourceIds: [], deduplicate: true, clean: true, semanticOptimize: true }
返回：{ datasetId, status }
### 获取数据集列表
GET /api/dataset
返回：[{ datasetId, name, status, createdAt }]
### 导出数据集
GET /api/dataset/:id/export
返回：{ fileUrl }
##5. 模型训练模块
### 创建训练任务
POST /api/train
Header: Authorization: Bearer <token>
请求体：{ datasetId, modelType, hyperParams }
返回：{ taskId, status }
### 获取训练任务列表
GET /api/train
返回：[{ taskId, datasetId, modelType, status, createdAt }]
### 获取训练任务详情
GET /api/train/:id
返回：{ taskId, logs, status, resultModelId }
## 6. 模型部署与评测
### 部署模型
POST /api/model/deploy
Header: Authorization: Bearer <token>
请求体：{ modelId }
返回：{ endpointUrl, status }
### 对话评测
POST /api/model/:id/chat
Header: Authorization: Bearer <token>
请求体：{ prompt }
返回：{ response }
### 获取评测结果
GET /api/model/:id/eval
返回：{ metrics: { accuracy, fluency, ... } }
## 7. 日志模块
### 获取操作日志
GET /api/logs
Header: Authorization: Bearer <token>
查询参数：?userId=xxx&type=train&page=1
返回：[{ logId, userId, action, detail, createdAt }]