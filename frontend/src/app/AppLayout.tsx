"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import Link from 'next/link';

//https://github.com/ant-design/ant-design/issues/52983
// const { Header, Content, Footer, Sider } = Layout;
import { Header } from "antd/es/layout/layout"; 
import { Footer } from "antd/es/layout/layout";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

const items: MenuProps['items'] = [
  {
    key: 'collect',
    label: <Link href="/collect">数据收集</Link>,
  },
  {
    key: 'dataset',
    label: <Link href="/dataset">数据集生成</Link>,
  },
  {
    key: 'train',
    label: <Link href="/train">模型微调</Link>,
  },
  {
    key: 'deploy',
    label: <Link href="/deploy">部署评测</Link>,
  },
];


const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 根据当前路由动态渲染侧边栏内容
  const pathname = usePathname();
  let sidebar: React.ReactNode = <div>请选择主页面</div>;
  if (pathname.startsWith('/collect')) {
    sidebar = (
      <Menu
        mode="inline"
        defaultSelectedKeys={['upload']}
        items={[{ key: 'upload', label: '文档上传' }, { key: 'tag', label: '标签管理' }, { key: 'extract', label: '文本提取' }, { key: 'export', label: '导出Markdown' }]}
      />
    );
  } else if (pathname.startsWith('/dataset')) {
    sidebar = (
      <Menu
        mode="inline"
        defaultSelectedKeys={['source']}
        items={[{ key: 'source', label: '数据源选择' }, { key: 'dedup', label: '数据去重' }, { key: 'clean', label: '数据清理' }, { key: 'semantic', label: '语义优化' }]}
      />
    );
  } else if (pathname.startsWith('/train')) {
    sidebar = (
      <Menu
        mode="inline"
        defaultSelectedKeys={['param']}
        items={[{ key: 'param', label: '超参数配置' }, { key: 'task', label: '训练任务' }, { key: 'log', label: '训练日志' }]}
      />
    );
  } else if (pathname.startsWith('/deploy')) {
    sidebar = (
      <Menu
        mode="inline"
        defaultSelectedKeys={['model']}
        items={[{ key: 'model', label: '模型部署' }, { key: 'chat', label: '对话评测' }, { key: 'metric', label: '评测指标' }]}
      />
    );
  }

  return (
    <html lang="zh-CN">
      <body>
        <Layout style={{ minHeight: '100vh' }}>
          <Header style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
              <Link href="/">
                <img src="/favicon.ico" alt="logo" style={{ height: 50, marginRight: 16 ,marginTop:24}} />
              </Link>
            </div>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['collect']}
              items={items}
              style={{ flex: 1 }}
            />
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>{sidebar}</Sider>
            <Content style={{ padding: '24px' }}>{children}</Content>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>数据搜集平台 ©2025</Footer>
        </Layout>
      </body>
    </html>
  );
};

export default AppLayout;
