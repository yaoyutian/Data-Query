# 数据搜集网站数据库设计

## 1. 用户表（users）

| 字段名      | 类型           | 约束         | 说明         |
| ----------- | -------------- | ------------ | ------------ |
| id          | SERIAL         | PRIMARY KEY  | 用户ID       |
| username    | VARCHAR(64)    | UNIQUE       | 用户名       |
| password    | VARCHAR(256)   | NOT NULL     | 密码哈希     |
| email       | VARCHAR(128)   | UNIQUE       | 邮箱         |
| roles       | VARCHAR(32)[]  |              | 角色         |
| created_at  | TIMESTAMP      | DEFAULT now()| 注册时间     |

---

## 2. 文档表（documents）

| 字段名      | 类型           | 约束         | 说明         |
| ----------- | -------------- | ------------ | ------------ |
| id          | SERIAL         | PRIMARY KEY  | 文档ID       |
| filename    | VARCHAR(256)   | NOT NULL     | 文件名       |
| file_url    | VARCHAR(512)   | NOT NULL     | 存储路径     |
| type        | VARCHAR(32)    |              | 文档类型     |
| uploader_id | INT            | FOREIGN KEY  | 上传者ID     |
| created_at  | TIMESTAMP      | DEFAULT now()| 上传时间     |

---

## 3. 标签表（tags）

| 字段名      | 类型           | 约束         | 说明         |
| ----------- | -------------- | ------------ | ------------ |
| id          | SERIAL         | PRIMARY KEY  | 标签ID       |
| name        | VARCHAR(64)    | UNIQUE       | 标签名       |
| created_at  | TIMESTAMP      | DEFAULT now()| 创建时间     |

---

## 4. 文档标签关联表（document_tags）

| 字段名      | 类型           | 约束         | 说明         |
| ----------- | -------------- | ------------ | ------------ |
| document_id | INT            | FOREIGN KEY  | 文档ID       |
| tag_id      | INT            | FOREIGN KEY  | 标签ID       |

---

## 5. 数据集表（datasets）

| 字段名      | 类型           | 约束         | 说明         |
| ----------- | -------------- | ------------ | ------------ |
| id          | SERIAL         | PRIMARY KEY  | 数据集ID     |
| name        | VARCHAR(128)   |              | 数据集名     |
| source_ids  | INT[]          |              | 来源文档ID   |
| status      | VARCHAR(32)    |              | 状态         |
| created_at  | TIMESTAMP      | DEFAULT now()| 创建时间     |

---

## 6. 训练任务表（train_tasks）

| 字段名      | 类型           | 约束         | 说明         |
| ----------- | -------------- | ------------ | ------------ |
| id          | SERIAL         | PRIMARY KEY  | 任务ID       |
| dataset_id  | INT            | FOREIGN KEY  | 数据集ID     |
| model_type  | VARCHAR(64)    |              | 模型类型     |
| hyperparams | JSONB          |              | 超参数配置   |
| status      | VARCHAR(32)    |              | 状态         |
| logs        | TEXT           |              | 训练日志     |
| result_model_id | INT        | FOREIGN KEY  | 结果模型ID   |
| created_at  | TIMESTAMP      | DEFAULT now()| 创建时间     |

---

## 7. 模型表（models）

| 字段名      | 类型           | 约束         | 说明         |
| ----------- | -------------- | ------------ | ------------ |
| id          | SERIAL         | PRIMARY KEY  | 模型ID       |
| name        | VARCHAR(128)   |              | 模型名       |
| file_url    | VARCHAR(512)   |              | 存储路径     |
| status      | VARCHAR(32)    |              | 状态         |
| created_at  | TIMESTAMP      | DEFAULT now()| 创建时间     |

---

## 8. 日志表（logs）

| 字段名      | 类型           | 约束         | 说明         |
| ----------- | -------------- | ------------ | ------------ |
| id          | SERIAL         | PRIMARY KEY  | 日志ID       |
| user_id     | INT            | FOREIGN KEY  | 用户ID       |
| action      | VARCHAR(64)    |              | 操作类型     |
| detail      | TEXT           |              | 详情         |
| created_at  | TIMESTAMP      | DEFAULT now()| 时间         |

---