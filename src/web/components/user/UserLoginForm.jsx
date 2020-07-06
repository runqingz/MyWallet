/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  Row, Col, Form, Input, Button, Checkbox,
  Typography, Space, message,
} from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import { userLogin, handleAuthenticationError } from '../../actions/securityActions';

class UserLoginForm extends Component {
  constructor() {
    super();
    this.onFinish = this.onFinish.bind(this);
  }

  async onFinish(values) {
    try {
      const { history } = this.props;
      message.loading({ content: 'Logging in', key: 'userLogin', duration: 0 });
      await this.props.userLogin(values);
      message.success({ content: 'Success', key: 'userLogin', duration: 1 });

      history.push('/');
    } catch (error) {
      message.error({ content: JSON.stringify(error.response.data), key: 'userLogin' });
      this.props.handleAuthenticationError();
    }
  }

  render() {
    const { Title } = Typography;

    return (
      <div className="d-flex align-items-center min-vw-100">
        <div className="container text-center">
          <Row justify="space-around" align="middle">
            <Title level={3}>Login</Title>
          </Row>
          <Row justify="space-around" align="middle">
            <Col span={6}>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}
                >
                  <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>
                <Form.Item>
                  {false && (
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
                  ) }
                  <a className="login-form-forgot" href="/login">
                    Forgot password
                  </a>
                </Form.Item>
                <Form.Item>
                  <Space>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      Log in
                    </Button>
                    Or
                    <a href="/login">register now!</a>
                  </Space>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

UserLoginForm.propTypes = {
  userLogin: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  handleAuthenticationError: PropTypes.func.isRequired,
};

export default connect(null, { userLogin, handleAuthenticationError })(UserLoginForm);
