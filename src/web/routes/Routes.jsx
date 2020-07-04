/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';

// Component
import SideNavbar from '../components/layout/SideNavbar';
import AntdHeader from '../components/layout/AntdHeader';

// Pages
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import BacklogBoard from '../components/backlog/BacklogBoard';
import AddTaskForm from '../components/backlog/AddTaskForm';
import ProtectedRoutes from './ProtectedRoutes';


// eslint-disable-next-line object-curly-newline
const { Header, Content, Footer } = Layout;

function Routes() {
  const authenticated = false;

  return (
    <Layout className="site-layout" style={{ minHeight: '100vh' }}>
      {authenticated && <SideNavbar />}
      <Layout className="site-layout-header">
        {authenticated && (
        <Header className="header" style={{ padding: 0 }}>
          <AntdHeader />
        </Header>
        )}
        <Content className="site-layout-content">
          <Switch>
            <Route exact path="/login" render={() => <Home />} />
            <Route path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/project/:projectId" component={BacklogBoard} />
            <Route path="/project/:projectId/addtask" component={AddTaskForm} />
          </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default Routes;
