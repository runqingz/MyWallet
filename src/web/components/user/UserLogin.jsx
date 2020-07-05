/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import {
  Row, Col, Form, Input, Button, Checkbox,
  Typography, Space,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const UserLogin = () => {
  const { Title } = Typography;

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

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
              onFinish={onFinish}
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
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                {', '}
                <a className="login-form-forgot" href="">
                  Forgot password
                </a>
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  Or
                  <a href="">register now!</a>
                </Space>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UserLogin;
