/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

// Component
import Sider from './web/components/layout/Sider';

// Pages
import Home from './web/components/Home';
import Dashboard from './web/components/Dashboard';
import UserHeader from './web/components/layout/Header';
import AddProject from './web/components/project/AddProject';

// eslint-disable-next-line object-curly-newline
const { Header, Content, Footer } = Layout;

function Routes() {
  return (
    <Layout className="site-sider" style={{ minHeight: '100vh' }}>
      <Sider />
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
}

export default Routes;
