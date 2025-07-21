"use client";
import React, { useState } from 'react';
import { Upload, Button, message, Form, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import api from '../../api/api';
/**
 * 数据收集主页面
 * 包含文档上传、标签选择等功能
 */
const CollectPage: React.FC = () => {
    const [fileList, setFileList] = useState<any[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<{ id: number; name: string }[]>([]);

  // 获取标签列表
  React.useEffect(() => {
    api.get('/tags').then(res => setTagOptions(res.data));
  }, []);

  const handleUpload = async (values: any) => {
    if (!fileList.length) {
      message.error('请先选择文件');
      return;
    }
    const formData = new FormData();
    formData.append('file', fileList[0]);
    formData.append('tags', JSON.stringify(values.tags));
    try {
      await api.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      message.success('上传成功');
      setFileList([]);
    } catch (e) {
      message.error('上传失败');
    }
  };

  return (
    <Form onFinish={handleUpload} layout="vertical">
      <Form.Item label="选择文档" required>
        <Upload
          beforeUpload={file => {
            setFileList([file]);
            return false;
          }}
          fileList={fileList}
          onRemove={() => setFileList([])}
          accept=".pdf,.doc,.docx,.xls,.xlsx,.epub,.md"
        >
          <Button icon={<UploadOutlined />}>选择文件</Button>
        </Upload>
      </Form.Item>
      <Form.Item label="标签" name="tags" rules={[{ required: true, message: '请选择标签' }]}> 
        <Select mode="multiple" placeholder="请选择标签">
          {/* {tagOptions.map(tag => (
             <Option key={tag.id} value={tag.name}>{tag.name}</Option>
          ))} */}
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">上传</Button>
    </Form>
  );
};

export default CollectPage;