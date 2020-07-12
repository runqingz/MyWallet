import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import PropTypes from 'prop-types';

// Component
import SideNavbar from './web/components/layout/SideNavbar';
import AntdHeader from './web/components/layout/AntdHeader';

// Pages
import Home from './web/components/Home';
import Dashboard from './web/components/Dashboard';
import BacklogBoard from './web/components/backlog/BacklogBoard';
import AddTaskForm from './web/components/backlog/AddTaskForm';
import UserLoginForm from './web/components/user/UserLoginForm';

import { setJWTToken, validateJWTToken } from './web/utils/securityUtils/JWTUtils';
import LoginRedirect from './web/components/security/LoginRedirect';
import { handleAuthenticationError } from './web/actions/securityActions';

const { Header, Content, Footer } = Layout;

class Routes extends Component {
  constructor(props) {
    super();
    const { user: { token } } = props;
    const validAuth = validateJWTToken(token);

    if (validAuth) {
      setJWTToken(token);
    } else {
      props.handleAuthenticationError();
    }
  }

  render() {
    const { authenticated } = this.props;
    return (
      <Layout className="site-layout" style={{ minHeight: '100vh' }}>
        {authenticated && <SideNavbar />}
        <Layout className="site-layout-header">
          {authenticated && (
          <Header className="header" style={{ padding: 0 }}>
            <AntdHeader />
          </Header>
          )}
          <Content className={authenticated ? 'site-layout-content' : 'd-flex site-layout-content'}>
            <Switch>
              <Route exact path="/login" component={UserLoginForm} />
              <Route exact path="/" component={authenticated ? Home : LoginRedirect} />
              <Route exact path="/dashboard" component={authenticated ? Dashboard : LoginRedirect} />
              <Route exact path="/project/:projectId" component={authenticated ? BacklogBoard : LoginRedirect} />
              <Route exact path="/project/:projectId/addtask" component={authenticated ? AddTaskForm : LoginRedirect} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2020 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}

Routes.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  handleAuthenticationError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.authentication.user,
  authenticated: state.authentication.authenticated,
});

export default connect(mapStateToProps, { handleAuthenticationError })(Routes);
