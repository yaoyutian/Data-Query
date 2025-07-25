# 民航适航大模型MaaS平台产品需求文档(PRD)

## 1. 产品概述

### 1.1 产品背景
民航客机制造业对适航认证的要求极其严格，需要深入理解大量的适航规章条例和审定文档。传统的人工审查方式效率低下且容易出错。本平台旨在构建专门针对适航领域的大语言模型，提供智能化的适航知识查询、文档审核和决策支持服务。

### 1.2 产品定位
面向民航制造企业、适航审定机构、技术咨询公司的专业级MaaS平台，提供从数据收集到模型部署的全链路适航大模型解决方案。

### 1.3 产品目标
- 构建高质量的适航知识数据集
- 训练出专业的适航垂类大模型
- 提供便捷的模型训练和部署服务
- 支持适航相关业务的智能化决策

## 2. 用户画像

### 2.1 主要用户
- **适航工程师**: 需要快速查询适航条例和审定案例
- **技术经理**: 负责适航项目管理和技术决策
- **数据科学家**: 负责模型训练和优化
- **系统管理员**: 负责平台运维和用户管理

### 2.2 使用场景
- 适航条例查询和解释
- 设计符合性验证
- 审定文档智能生成
- 历史案例分析和参考

## 3. 功能需求

### 3.1 用户系统模块

#### 3.1.1 用户注册
**功能描述**: 支持新用户注册账号
**具体要求**:
- 支持邮箱注册
- 密码强度验证（至少8位，包含字母数字特殊字符）
- 邮箱验证激活
- 用户角色分配（管理员/普通用户）

#### 3.1.2 用户登录
**功能描述**: 用户身份验证和会话管理
**具体要求**:
- 支持邮箱+密码登录
- JWT token认证
- 记住登录状态
- 登录失败次数限制

#### 3.1.3 用户管理
**功能描述**: 用户信息维护和权限管理
**具体要求**:
- 用户信息编辑
- 密码修改
- 权限分配（数据管理、模型训练、模型部署等）
- 用户状态管理（激活/禁用）

### 3.2 数据收集模块

#### 3.2.1 数据文件上传
**功能描述**: 支持多种格式的适航文档上传
**具体要求**:
- 支持文件格式：PDF、Word、Excel、TXT
- 单文件最大100MB
- 批量上传功能
- 上传进度显示
- 文件预览功能

#### 3.2.2 文档识别
**功能描述**: 自动识别文档类型和结构
**具体要求**:
- OCR文字识别
- 文档结构解析（标题、段落、表格、图片）
- 适航条例自动分类
- 文档质量评估

#### 3.2.3 文本提取
**功能描述**: 从各类文档中提取纯文本内容
**具体要求**:
- PDF文本提取（包括扫描件）
- Word文档解析
- 表格数据提取
- 图片文字识别
- 文本格式化处理

#### 3.2.4 导出Markdown
**功能描述**: 将提取的文本转换为Markdown格式
**具体要求**:
- 保留文档结构层次
- 表格转换为Markdown格式
- 支持自定义导出模板
- 批量导出功能

### 3.3 数据集生成模块

#### 3.3.1 选择数据来源
**功能描述**: 从已收集的数据中选择训练数据
**具体要求**:
- 数据源列表展示
- 数据质量评分
- 数据分类筛选
- 数据预览功能
- 数据统计信息

#### 3.3.2 数据去重
**功能描述**: 识别和处理重复数据
**具体要求**:
- 文本相似度计算
- 重复数据标识
- 去重规则配置
- 手动审核去重结果

#### 3.3.3 数据清理
**功能描述**: 清理和规范化数据质量
**具体要求**:
- 无效字符过滤
- 格式标准化
- 敏感信息脱敏
- 数据完整性检查
- 异常数据标记

#### 3.3.4 语义流畅处理
**功能描述**: 优化文本的语义连贯性
**具体要求**:
- 断句优化
- 语法检查
- 术语标准化
- 上下文连贯性分析
- 文本质量评估

### 3.4 模型微调训练模块

#### 3.4.1 前端配置界面
**功能描述**: 可视化的超参数配置界面
**具体要求**:
- 基础模型选择（支持主流开源模型）
- 学习率、批次大小等超参数设置
- 训练轮次和验证策略配置
- 资源分配配置（GPU、内存）
- 训练任务命名和描述

#### 3.4.2 后端训练服务
**功能描述**: 基于ms-swift框架的模型训练
**具体要求**:
- 支持LoRA、QLoRA等微调方法
- 分布式训练支持
- 训练进度实时监控
- 模型检查点保存
- 训练日志记录
- 异常处理和恢复

#### 3.4.3 训练监控
**功能描述**: 训练过程的实时监控和管理
**具体要求**:
- 训练损失曲线展示
- 资源使用率监控
- 训练任务状态管理
- 早停机制配置
- 训练任务取消和暂停

### 3.5 模型部署评测模块

#### 3.5.1 模型部署
**功能描述**: 将训练好的模型部署为可用服务
**具体要求**:
- 模型推理服务部署
- API接口生成
- 负载均衡配置
- 服务健康检查
- 版本管理

#### 3.5.2 对话评测
**功能描述**: 通过对话形式评估模型效果
**具体要求**:
- 交互式对话界面
- 预设测试用例
- 回答质量评分
- 响应时间统计
- 多轮对话支持

#### 3.5.3 性能评测
**功能描述**: 量化评估模型各项性能指标
**具体要求**:
- 标准评测数据集
- BLEU、ROUGE等指标计算
- 专业度评估（适航知识准确性）
- 安全性评估
- 评测报告生成

### 3.6 日志系统

#### 3.6.1 操作日志
**功能描述**: 记录用户操作行为
**具体要求**:
- 用户登录/登出记录
- 文件上传/下载记录
- 模型训练操作记录
- 数据处理操作记录

#### 3.6.2 系统日志
**功能描述**: 记录系统运行状态
**具体要求**:
- 应用错误日志
- 性能监控日志
- 资源使用日志
- 安全事件日志

#### 3.6.3 日志查询
**功能描述**: 日志检索和分析功能
**具体要求**:
- 时间范围筛选
- 用户行为分析
- 异常事件告警
- 日志导出功能

## 4. 非功能性需求

### 4.1 性能要求
- 支持并发用户数：100+
- 文件上传响应时间：< 5秒（10MB文件）
- 模型推理响应时间：< 3秒
- 系统可用性：99.5%

### 4.2 安全要求
- 数据传输HTTPS加密
- 敏感数据存储加密
- 用户权限严格控制
- 数据备份和灾难恢复

### 4.3 兼容性要求
- 支持Chrome、Firefox、Safari等主流浏览器
- 支持Windows、macOS、Linux操作系统
- 移动端响应式设计

## 5. 技术要求

### 5.1 前端技术栈
- Next.js + TypeScript
- React Hook Form表单处理
- Ant Design / Tailwind CSS UI框架
- Axios HTTP客户端
- Chart.js数据可视化

### 5.2 后端技术栈
- Node.js + TypeScript（API服务）
- Python（模型训练服务）
- ms-swift微调框架
- transformers库
- FastAPI（Python API）

### 5.3 数据库
- PostgreSQL（关系型数据）
- Redis（缓存和会话）
- MinIO/AWS S3（文件存储）

## 6. 交付标准

### 6.1 功能完整性
- 所有核心功能模块正常运行
- 用户流程端到端测试通过
- API接口文档完整

### 6.2 代码质量
- 代码覆盖率 > 80%
- 通过静态代码扫描
- 遵循编码规范

### 6.3 文档完整性
- 用户操作手册
- 部署运维文档
- API接口文档
- 系统架构文档

## 7. 项目里程碑

### Phase 1 (4周)
- 用户系统和基础架构
- 数据收集模块基础功能

### Phase 2 (6周)
- 数据集生成模块
- 文档处理和清洗功能

### Phase 3 (8周)
- 模型微调训练模块
- ms-swift集成和调试

### Phase 4 (4周)
- 模型部署评测模块
- 系统集成测试

### Phase 5 (2周)
- 性能优化和上线准备
- 文档整理和交付