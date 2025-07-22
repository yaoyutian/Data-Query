# 民航适航大模型MaaS平台架构设计文档

## 1. 架构概览

### 1.1 总体架构
本系统采用微服务架构，分为前端表示层、API网关层、业务服务层、数据存储层和基础设施层。整体架构支持水平扩展，具备高可用性和容错能力。

### 1.2 核心设计原则
- **服务化**: 按业务领域拆分服务，降低耦合度
- **可扩展**: 支持水平扩展和弹性伸缩
- **高可用**: 多层容错机制，保证系统稳定性
- **安全性**: 多重安全保障，保护敏感数据
- **可观测**: 完整的监控和日志体系

## 2. 系统架构图

```
┌─────────────────────────────────────────────────────────────┐
│                      前端应用层                                │
├─────────────────────────────────────────────────────────────┤
│  Web Frontend (Next.js + TypeScript)                       │
│  ├─ 用户管理界面    ├─ 数据收集界面    ├─ 模型训练界面        │
│  ├─ 数据处理界面    ├─ 模型部署界面    ├─ 评测分析界面        │
└─────────────────────────────────────────────────────────────┘
                                │
                         HTTPS/WebSocket
                                │
┌─────────────────────────────────────────────────────────────┐
│                      API网关层                                │
├─────────────────────────────────────────────────────────────┤
│  Nginx / Kong Gateway                                       │
│  ├─ 负载均衡        ├─ 限流控制        ├─ SSL终端            │
│  ├─ 身份验证        ├─ API路由         ├─ 监控采集           │
└─────────────────────────────────────────────────────────────┘
                                │
                              REST API
                                │
┌─────────────────────────────────────────────────────────────┐
│                     业务服务层                                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │ 用户服务     │  │ 数据服务     │  │ 训练服务     │           │
│  │ (Node.js)   │  │ (Node.js)   │  │ (Python)    │           │
│  │ - 用户管理   │  │ - 文件上传   │  │ - 模型微调   │           │
│  │ - 权限控制   │  │ - 文档解析   │  │ - ms-swift   │           │
│  │ - JWT认证    │  │ - 数据清洗   │  │ - 训练监控   │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │ 模型服务     │  │ 评测服务     │  │ 日志服务     │           │
│  │ (Python)    │  │ (Python)    │  │ (Node.js)   │           │
│  │ - 模型部署   │  │ - 对话评测   │  │ - 日志收集   │           │
│  │ - 推理API    │  │ - 性能评估   │  │ - 日志查询   │           │
│  │ - 版本管理   │  │ - 报告生成   │  │ - 监控告警   │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                                │
                            数据访问层
                                │
┌─────────────────────────────────────────────────────────────┐
│                     数据存储层                                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐           │
│  │ PostgreSQL  │  │    Redis    │  │   MinIO     │           │
│  │ - 用户数据   │  │ - 会话缓存   │  │ - 文件存储   │           │
│  │ - 任务记录   │  │ - 任务队列   │  │ - 模型文件   │           │
│  │ - 日志数据   │  │ - 分布式锁   │  │ - 数据集     │           │
│  └─────────────┘  └─────────────┘  └─────────────┘           │
└─────────────────────────────────────────────────────────────┘
                                │
┌─────────────────────────────────────────────────────────────┐
│                    基础设施层                                 │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌──────────┐ │
│ │Docker容器化 │ │Kubernetes编排│ │Prometheus监控│ │ELK日志栈│ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └──────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 3. 核心服务设计

### 3.1 用户服务 (User Service)

**技术栈**: Node.js + TypeScript + Express
**职责**: 用户认证、授权、个人信息管理

#### 3.1.1 核心功能
- 用户注册/登录
- JWT token生成和验证
- 基于RBAC的权限控制
- 用户信息CRUD操作

#### 3.1.2 数据模型
```typescript
interface User {
  id: string;
  email: string;
  hashedPassword: string;
  role: 'admin' | 'user';
  profile: UserProfile;
  createdAt: Date;
  updatedAt: Date;
}

interface UserProfile {
  name: string;
  avatar?: string;
  organization?: string;
  position?: string;
}
```

#### 3.1.3 主要API
- `POST /auth/register` - 用户注册
- `POST /auth/login` - 用户登录
- `GET /users/profile` - 获取用户信息
- `PUT /users/profile` - 更新用户信息

### 3.2 数据服务 (Data Service)

**技术栈**: Node.js + TypeScript + Express + Multer
**职责**: 文件处理、文档解析、数据预处理

#### 3.2.1 核心功能
- 多格式文件上传和存储
- 文档内容提取和解析
- 数据清洗和去重
- Markdown格式转换

#### 3.2.2 数据流程
```
文件上传 → 格式识别 → 内容提取 → 文本清洗 → 去重处理 → 质量评估 → 数据入库
```

#### 3.2.3 主要API
- `POST /data/upload` - 文件上传
- `GET /data/documents` - 文档列表
- `POST /data/extract` - 文本提取
- `POST /data/clean` - 数据清洗
- `POST /data/export` - 导出数据

### 3.3 训练服务 (Training Service)

**技术栈**: Python + FastAPI + ms-swift + transformers
**职责**: 模型微调训练、训练任务管理

#### 3.3.1 核心功能
- 基于ms-swift的模型微调
- 训练任务调度和监控
- 超参数配置管理
- 训练资源分配

#### 3.3.2 训练流程
```python
# 伪代码示例
class TrainingService:
    def start_training(self, config: TrainingConfig):
        # 1. 准备数据集
        dataset = self.prepare_dataset(config.dataset_path)
        
        # 2. 加载基础模型
        model = self.load_base_model(config.base_model)
        
        # 3. 配置训练参数
        training_args = self.setup_training_args(config)
        
        # 4. 启动训练
        trainer = self.create_trainer(model, dataset, training_args)
        trainer.train()
        
        # 5. 保存模型
        self.save_model(trainer.model, config.output_path)
```

#### 3.3.3 主要API
- `POST /training/start` - 开始训练
- `GET /training/status/{job_id}` - 获取训练状态
- `POST /training/stop/{job_id}` - 停止训练
- `GET /training/logs/{job_id}` - 获取训练日志

### 3.4 模型服务 (Model Service)

**技术栈**: Python + FastAPI + transformers + torch
**职责**: 模型部署、推理服务、版本管理

#### 3.4.1 核心功能
- 模型推理API
- 模型版本管理
- 负载均衡和缓存
- 性能监控

#### 3.4.2 推理架构
```python
class ModelInferenceService:
    def __init__(self):
        self.model_cache = {}
        self.tokenizer_cache = {}
    
    async def generate_response(self, model_id: str, prompt: str):
        model = await self.load_model(model_id)
        tokenizer = await self.load_tokenizer(model_id)
        
        inputs = tokenizer(prompt, return_tensors="pt")
        outputs = model.generate(**inputs, max_length=512)
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return response
```

#### 3.4.3 主要API
- `POST /models/deploy` - 部署模型
- `POST /models/{model_id}/generate` - 生成响应
- `GET /models/{model_id}/info` - 模型信息
- `DELETE /models/{model_id}` - 删除模型

### 3.5 评测服务 (Evaluation Service)

**技术栈**: Python + FastAPI + transformers + scikit-learn
**职责**: 模型评测、性能分析、报告生成

#### 3.5.1 核心功能
- 对话质量评测
- 专业知识准确性评估
- 性能基准测试
- 评测报告生成

#### 3.5.2 评测指标
```python
class EvaluationMetrics:
    def calculate_bleu_score(self, predictions, references):
        # BLEU评分计算
        pass
    
    def calculate_rouge_score(self, predictions, references):
        # ROUGE评分计算
        pass
    
    def evaluate_aviation_knowledge(self, model_responses, expert_answers):
        # 适航知识专业度评估
        pass
```

## 4. 数据架构设计

### 4.1 数据库设计

#### 4.1.1 PostgreSQL表结构

**用户表 (users)**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    profile JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**文档表 (documents)**
```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    status VARCHAR(50) DEFAULT 'uploaded',
    extracted_text TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**训练任务表 (training_jobs)**
```sql
CREATE TABLE training_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    name VARCHAR(255) NOT NULL,
    config JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    progress INTEGER DEFAULT 0,
    model_path VARCHAR(500),
    logs TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP
);
```

**模型表 (models)**
```sql
CREATE TABLE models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    training_job_id UUID REFERENCES training_jobs(id),
    name VARCHAR(255) NOT NULL,
    version VARCHAR(50),
    model_path VARCHAR(500),
    status VARCHAR(50) DEFAULT 'training',
    metrics JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4.2 Redis缓存设计

**缓存策略**
- 用户会话: `session:{user_id}` (TTL: 24h)
- 模型缓存: `model:{model_id}` (TTL: 1h)
- API限流: `rate_limit:{user_id}:{endpoint}` (TTL: 1h)
- 任务队列: `training_queue`, `evaluation_queue`

### 4.3 文件存储设计

**MinIO存储结构**
```
/aviation-maas
├── documents/
│   ├── {user_id}/
│   │   ├── raw/           # 原始文件
│   │   └── processed/     # 处理后的文件
├── datasets/
│   ├── {dataset_id}/      # 训练数据集
├── models/
│   ├── {model_id}/
│   │   ├── checkpoints/   # 训练检查点
│   │   └── final/         # 最终模型
└── logs/
    └── {job_id}/          # 训练日志
```

## 5. 安全设计

### 5.1 身份认证
- JWT Token认证机制
- Refresh Token自动续期
- 多因子认证支持
- 密码强度策略

### 5.2 授权控制
```typescript
enum Permission {
  USER_MANAGE = 'user:manage',
  DATA_UPLOAD = 'data:upload',
  DATA_PROCESS = 'data:process',
  MODEL_TRAIN = 'model:train',
  MODEL_DEPLOY = 'model:deploy',
  SYSTEM_ADMIN = 'system:admin'
}

interface Role {
  name: string;
  permissions: Permission[];
}
```

### 5.3 数据安全
- 数据库连接加密
- 敏感数据字段加密存储
- 文件上传病毒扫描
- 数据访问审计日志

### 5.4 网络安全
- HTTPS强制加密
- API限流和DDoS防护
- 跨域请求控制(CORS)
- 安全头部设置

## 6. 部署架构

### 6.1 容器化部署

**Docker镜像构建**
```dockerfile
# 前端镜像
FROM node:18-alpine as frontend
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 后端API镜像
FROM node:18-alpine as backend
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]

# Python训练服务镜像
FROM python:3.9-slim as training
WORKDIR /app
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### 6.2 Kubernetes部署

**服务部署配置**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aviation-maas-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: aviation-maas-api
  template:
    metadata:
      labels:
        app: aviation-maas-api
    spec:
      containers:
      - name: api
        image: aviation-maas/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: url
---
apiVersion: v1
kind: Service
metadata:
  name: aviation-maas-api-service
spec:
  selector:
    app: aviation-maas-api
  ports:
  - port: 80
    targetPort: 3000
  type: ClusterIP
```

### 6.3 监控部署

**Prometheus配置**
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'aviation-maas-api'
      static_configs:
      - targets: ['aviation-maas-api-service:80']
    - job_name: 'aviation-maas-training'
      static_configs:
      - targets: ['aviation-maas-training-service:8000']
    - job_name: 'postgresql'
      static_configs:
      - targets: ['postgres-exporter:9187']
    - job_name: 'redis'
      static_configs:
      - targets: ['redis-exporter:9121']
```

**Grafana仪表板配置**
```json
{
  "dashboard": {
    "title": "Aviation MaaS Platform",
    "panels": [
      {
        "title": "API Response Time",
        "type": "graph",
        "targets": [
          {
            "expr": "histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))"
          }
        ]
      },
      {
        "title": "Training Job Status",
        "type": "stat",
        "targets": [
          {
            "expr": "count by (status) (training_jobs_total)"
          }
        ]
      }
    ]
  }
}
```

## 7. 性能优化

### 7.1 数据库优化

**索引策略**
```sql
-- 用户表索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- 文档表索引
CREATE INDEX idx_documents_user_id ON documents(user_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_documents_created_at ON documents(created_at DESC);

-- 训练任务表索引
CREATE INDEX idx_training_jobs_user_id ON training_jobs(user_id);
CREATE INDEX idx_training_jobs_status ON training_jobs(status);
CREATE INDEX idx_training_jobs_created_at ON training_jobs(created_at DESC);

-- 全文搜索索引
CREATE INDEX idx_documents_text_search ON documents USING gin(to_tsvector('english', extracted_text));
```

**查询优化**
```typescript
// 分页查询优化
class DocumentService {
  async getDocumentsByUser(userId: string, page: number, limit: number) {
    const offset = (page - 1) * limit;
    
    const [documents, total] = await Promise.all([
      this.db.query(`
        SELECT id, filename, file_type, file_size, status, created_at
        FROM documents 
        WHERE user_id = $1 
        ORDER BY created_at DESC 
        LIMIT $2 OFFSET $3
      `, [userId, limit, offset]),
      
      this.db.query(`
        SELECT COUNT(*) as total 
        FROM documents 
        WHERE user_id = $1
      `, [userId])
    ]);
    
    return {
      documents: documents.rows,
      pagination: {
        page,
        limit,
        total: parseInt(total.rows[0].total),
        pages: Math.ceil(parseInt(total.rows[0].total) / limit)
      }
    };
  }
}
```

### 7.2 缓存策略

**Redis缓存实现**
```typescript
class CacheService {
  private redis: Redis;
  
  async get<T>(key: string): Promise<T | null> {
    const cached = await this.redis.get(key);
    return cached ? JSON.parse(cached) : null;
  }
  
  async set(key: string, value: any, ttl: number = 3600): Promise<void> {
    await this.redis.setex(key, ttl, JSON.stringify(value));
  }
  
  async getOrSet<T>(
    key: string, 
    fetcher: () => Promise<T>, 
    ttl: number = 3600
  ): Promise<T> {
    let data = await this.get<T>(key);
    if (!data) {
      data = await fetcher();
      await this.set(key, data, ttl);
    }
    return data;
  }
}

// 使用示例
class ModelService {
  async getModelInfo(modelId: string) {
    return this.cache.getOrSet(
      `model:${modelId}:info`,
      () => this.db.getModelById(modelId),
      1800 // 30分钟缓存
    );
  }
}
```

### 7.3 文件处理优化

**异步文件处理**
```typescript
class FileProcessingService {
  private queue: Queue;
  
  constructor() {
    this.queue = new Bull('file-processing', {
      redis: { host: 'redis', port: 6379 }
    });
    
    this.queue.process('extract-text', this.processTextExtraction.bind(this));
    this.queue.process('clean-data', this.processDataCleaning.bind(this));
  }
  
  async uploadFile(file: File, userId: string) {
    // 1. 快速上传到存储
    const filePath = await this.storage.upload(file);
    
    // 2. 创建文档记录
    const document = await this.db.createDocument({
      userId,
      filename: file.originalname,
      filePath,
      status: 'uploaded'
    });
    
    // 3. 添加到处理队列
    await this.queue.add('extract-text', {
      documentId: document.id,
      filePath
    });
    
    return document;
  }
  
  private async processTextExtraction(job: Job) {
    const { documentId, filePath } = job.data;
    
    try {
      // 更新状态为处理中
      await this.db.updateDocumentStatus(documentId, 'processing');
      
      // 提取文本
      const extractedText = await this.textExtractor.extract(filePath);
      
      // 保存结果
      await this.db.updateDocument(documentId, {
        extractedText,
        status: 'completed'
      });
      
    } catch (error) {
      await this.db.updateDocumentStatus(documentId, 'failed');
      throw error;
    }
  }
}
```

## 8. 错误处理和容错设计

### 8.1 全局错误处理

**API错误处理中间件**
```typescript
class ErrorHandler {
  static handle(error: Error, req: Request, res: Response, next: NextFunction) {
    const errorResponse = {
      success: false,
      message: error.message,
      timestamp: new Date().toISOString(),
      path: req.path
    };
    
    if (error instanceof ValidationError) {
      res.status(400).json({
        ...errorResponse,
        type: 'VALIDATION_ERROR',
        details: error.details
      });
    } else if (error instanceof AuthenticationError) {
      res.status(401).json({
        ...errorResponse,
        type: 'AUTHENTICATION_ERROR'
      });
    } else if (error instanceof AuthorizationError) {
      res.status(403).json({
        ...errorResponse,
        type: 'AUTHORIZATION_ERROR'
      });
    } else {
      // 记录未知错误
      logger.error('Unhandled error:', error);
      
      res.status(500).json({
        ...errorResponse,
        type: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred'
      });
    }
  }
}
```

### 8.2 重试机制

**训练任务重试**
```python
import asyncio
from tenacity import retry, stop_after_attempt, wait_exponential

class TrainingService:
    @retry(
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=4, max=10),
        retry_error_callback=lambda retry_state: logger.error(f"Training failed after {retry_state.attempt_number} attempts")
    )
    async def start_training(self, config: TrainingConfig):
        try:
            # 训练逻辑
            return await self._execute_training(config)
        except Exception as e:
            # 记录失败信息
            await self.log_training_failure(config.job_id, str(e))
            raise
    
    async def _execute_training(self, config: TrainingConfig):
        # 具体的训练实现
        pass
```

### 8.3 熔断器模式

**服务熔断实现**
```typescript
class CircuitBreaker {
  private failures: number = 0;
  private lastFailureTime: number = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  constructor(
    private failureThreshold: number = 5,
    private timeout: number = 60000, // 1分钟
    private retryTimeout: number = 10000 // 10秒
  ) {}
  
  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === 'OPEN') {
      if (Date.now() - this.lastFailureTime < this.timeout) {
        throw new Error('Circuit breaker is OPEN');
      }
      this.state = 'HALF_OPEN';
    }
    
    try {
      const result = await fn();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }
  
  private onSuccess() {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure() {
    this.failures++;
    this.lastFailureTime = Date.now();
    
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
    }
  }
}
```

## 9. 日志和监控

### 9.1 结构化日志

**日志格式标准**
```typescript
interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
  service: string;
  traceId: string;
  userId?: string;
  action: string;
  details: Record<string, any>;
  duration?: number;
  error?: {
    message: string;
    stack: string;
    code?: string;
  };
}

class Logger {
  static info(action: string, details: Record<string, any> = {}) {
    this.log('info', action, details);
  }
  
  static error(action: string, error: Error, details: Record<string, any> = {}) {
    this.log('error', action, {
      ...details,
      error: {
        message: error.message,
        stack: error.stack,
        code: (error as any).code
      }
    });
  }
  
  private static log(level: string, action: string, details: Record<string, any>) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: level as any,
      service: process.env.SERVICE_NAME || 'unknown',
      traceId: this.getTraceId(),
      action,
      details
    };
    
    console.log(JSON.stringify(entry));
  }
}
```

### 9.2 性能监控

**关键指标监控**
```typescript
class MetricsCollector {
  private prometheus = require('prom-client');
  
  private httpRequestDuration = new this.prometheus.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status']
  });
  
  private trainingJobsTotal = new this.prometheus.Counter({
    name: 'training_jobs_total',
    help: 'Total number of training jobs',
    labelNames: ['status']
  });
  
  private modelInferenceLatency = new this.prometheus.Histogram({
    name: 'model_inference_latency_seconds',
    help: 'Model inference latency in seconds',
    labelNames: ['model_id']
  });
  
  recordHttpRequest(method: string, route: string, status: number, duration: number) {
    this.httpRequestDuration
      .labels(method, route, status.toString())
      .observe(duration);
  }
  
  recordTrainingJob(status: string) {
    this.trainingJobsTotal.labels(status).inc();
  }
  
  recordInference(modelId: string, duration: number) {
    this.modelInferenceLatency
      .labels(modelId)
      .observe(duration);
  }
}
```

## 10. 扩展性设计

### 10.1 水平扩展

**负载均衡配置**
```nginx
upstream aviation_maas_api {
    least_conn;
    server api-1:3000 weight=1 max_fails=3 fail_timeout=30s;
    server api-2:3000 weight=1 max_fails=3 fail_timeout=30s;
    server api-3:3000 weight=1 max_fails=3 fail_timeout=30s;
}

upstream aviation_maas_training {
    ip_hash;  # 保持会话亲和性
    server training-1:8000 weight=1 max_fails=2 fail_timeout=30s;
    server training-2:8000 weight=1 max_fails=2 fail_timeout=30s;
}

server {
    listen 80;
    server_name aviation-maas.com;
    
    location /api/ {
        proxy_pass http://aviation_maas_api;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    location /training/ {
        proxy_pass http://aviation_maas_training;
        proxy_read_timeout 300s;
        proxy_send_timeout 300s;
    }
}
```

### 10.2 数据库扩展

**读写分离配置**
```typescript
class DatabaseManager {
  private writeDb: Pool;  // 主数据库
  private readDb: Pool;   // 从数据库
  
  async query(sql: string, params: any[], options: { readonly?: boolean } = {}) {
    const db = options.readonly ? this.readDb : this.writeDb;
    return db.query(sql, params);
  }
  
  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.writeDb.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
```

### 10.3 消息队列集群

**Redis Cluster配置**
```typescript
const Redis = require('ioredis');

const cluster = new Redis.Cluster([
  { host: 'redis-1', port: 6379 },
  { host: 'redis-2', port: 6379 },
  { host: 'redis-3', port: 6379 }
], {
  redisOptions: {
    password: process.env.REDIS_PASSWORD
  },
  enableOfflineQueue: false,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3
});

class QueueService {
  private queue: Queue;
  
  constructor() {
    this.queue = new Bull('training-queue', {
      redis: cluster,
      defaultJobOptions: {
        removeOnComplete: 100,
        removeOnFail: 50,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 5000
        }
      }
    });
  }
}
```

## 11. 备份和灾难恢复

### 11.1 数据备份策略

**自动备份脚本**
```bash
#!/bin/bash
# 数据库备份脚本

BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="aviation_maas"

# PostgreSQL备份
pg_dump -h postgres -U $DB_USER -d $DB_NAME > $BACKUP_DIR/db_$DATE.sql

# 文件存储备份
mc mirror local/aviation-maas backup-bucket/aviation-maas-$DATE

# 清理旧备份（保留30天）
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete

# 验证备份完整性
if [ -f "$BACKUP_DIR/db_$DATE.sql" ]; then
    echo "Backup completed successfully: db_$DATE.sql"
else
    echo "Backup failed!" >&2
    exit 1
fi
```

### 11.2 高可用部署

**Kubernetes高可用配置**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aviation-maas-api
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  template:
    spec:
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - aviation-maas-api
              topologyKey: kubernetes.io/hostname
      containers:
      - name: api
        image: aviation-maas/api:latest
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

## 12. 总结

本架构设计文档详细描述了民航适航大模型MaaS平台的技术架构、核心服务设计、数据架构、安全策略、部署方案等各个方面。该架构具备以下特点：

1. **模块化设计**: 采用微服务架构，各模块职责清晰，便于独立开发和部署
2. **高可扩展性**: 支持水平扩展，可根据业务需求动态调整资源
3. **高可用性**: 多层容错机制，确保系统稳定运行
4. **安全可靠**: 完善的安全策略和数据保护措施
5. **易于运维**: 完整的监控、日志和备份体系

该架构能够满足民航适航大模型训练和部署的业务需求，为构建专业的适航领域AI应用提供了坚实的技术基础。