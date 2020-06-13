/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

// Component
import SideNavbar from './web/components/layout/SideNavbar';
import AntdHeader from './web/components/layout/AntdHeader';

// Pages
import Home from './web/components/Home';
import Dashboard from './web/components/Dashboard';
import BacklogBoard from './web/components/backlog/BacklogBoard';
import AddTaskForm from './web/components/backlog/AddTaskForm';


// eslint-disable-next-line object-curly-newline
const { Header, Content, Footer } = Layout;

function Routes() {
  return (
    <Layout className="site-layout" style={{ minHeight: '100vh' }}>
      <SideNavbar />
      <Layout className="site-layout-header">
        <Header className="header" style={{ padding: 0 }}>
          <AntdHeader />
        </Header>
        <Content className="site-layout-content">
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path="/project/:projectId" component={BacklogBoard} />
            <Route exact path="/project/:projectId/addtask" component={AddTaskForm} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default Routes;
