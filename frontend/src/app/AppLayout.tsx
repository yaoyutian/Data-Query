import React from 'react';
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
  return (
    <html lang="zh-CN">
      <body>
        <Layout style={{ minHeight: '100vh' }}>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['collect']}
              items={items}
            />
          </Header>
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>侧边栏内容</Sider>
            <Content style={{ padding: '24px' }}>{children}</Content>
          </Layout>
          <Footer style={{ textAlign: 'center' }}>数据搜集平台 ©2025</Footer>
        </Layout>
      </body>
    </html>
  );
};

export default AppLayout;
