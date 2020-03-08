/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
// icons taken from antd template
import {
  HomeOutlined,
  PieChartOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';

// Pages
import Home from './web/components/Home';
import Dashboard from './web/components/Dashboard';
import UserHeader from './web/components/layout/Header';
import AddProject from './web/components/project/AddProject';

// eslint-disable-next-line object-curly-newline
const { Header, Content, Footer, Sider } = Layout;

function Routes() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="site-sider" style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <HomeOutlined />
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <PieChartOutlined />
            <Link to="/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <AppstoreAddOutlined />
            <Link to="/addProject">Add Project</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-header" style={{ padding: 0 }}>
          <UserHeader />
        </Header>
        <Content className="site-layout-content">
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/dashboard" exact render={() => <Dashboard />} />
            <Route path="/addProject" exact render={() => <AddProject />} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default withRouter(Routes);
