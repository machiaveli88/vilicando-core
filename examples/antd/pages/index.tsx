import * as React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { useFela } from 'vilicando-antd';

const { Header, Content, Footer } = Layout;

function StartPage() {
  const { css, theme } = useFela();

  return (
    <Layout className="layout">
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          className={css({ lineHeight: theme.layoutHeaderHeight })}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content className={css({ paddingX: theme.paddingXxl })}>
        <Breadcrumb className={css({ marginY: theme.paddingXl })}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div
          className={css({
            background: theme.white,
            padding: theme.paddingXl,
            minHeight: 280
          })}
        >
          Content
        </div>
      </Content>
      <Footer className={css({ textAlign: 'center' })}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default StartPage;
