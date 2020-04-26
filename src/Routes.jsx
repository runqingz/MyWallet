/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

// Component
import SideNavbar from './web/components/layout/SideNavbar';

// Pages
import Home from './web/components/Home';
import Dashboard from './web/components/Dashboard';
import UserHeader from './web/components/layout/Header';
import AddProject from './web/components/project/AddProject';
import UpdateProject from './web/components/project/UpdateProject';

// eslint-disable-next-line object-curly-newline
const { Header, Content, Footer } = Layout;

function Routes() {
  return (
    <Layout className="site-layout" style={{ minHeight: '100vh' }}>
      <SideNavbar />
      <Layout className="site-layout-header">
        <Header className="header" style={{ padding: 0 }}>
          <UserHeader />
        </Header>
        <Content className="site-layout-content">
          <Switch>
            <Route path="/" exact render={() => <Home />} />
            <Route path="/dashboard" exact render={() => <Dashboard />} />
            <Route path="/addProject" exact render={() => <AddProject />} />
            <Route path="/updateProject/:id" exact render={() => <UpdateProject />} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default Routes;
