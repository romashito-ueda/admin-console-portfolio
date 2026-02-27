import { Breadcrumb, Layout, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

const { Header, Content } = Layout;

type BreadcrumbItem = {
  title: string;
  href?: string;
};

type Props = {
  title: string;
  breadcrumbItems: BreadcrumbItem[];
  extra?: ReactNode;
  children: ReactNode;
};

export const PageLayout = ({ title, breadcrumbItems, extra, children }: Props) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ color: '#fff', fontWeight: 700 }}>Admin Console Portfolio</Header>
      <Content style={{ padding: 24 }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Breadcrumb
            items={breadcrumbItems.map((item) => ({
              title: item.href ? <Link to={item.href}>{item.title}</Link> : item.title,
            }))}
          />
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Typography.Title level={2} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            {extra}
          </Space>
          {children}
        </Space>
      </Content>
    </Layout>
  );
};
