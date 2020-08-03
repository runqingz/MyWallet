import React, { useEffect } from 'react';
import {
  Row, Col, Form, Input, Button, Checkbox,
  Typography, Space, message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { userLoginAction, clearCurrentUserAction } from '../../actions/securityActions';

export default function UserLoginForm() {
  const { Title } = Typography;
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCurrentUserAction());
  }, [dispatch]);

  async function onFinish(values) {
    try {
      const loginAction = await userLoginAction(values);
      message.loading({ content: 'Logging in', key: 'userLogin', duration: 0 });
      dispatch(loginAction);

      message.success({ content: 'Logged in', key: 'userLogin', duration: 1 });

      history.push('/');
    } catch (error) {
      message.error({ content: JSON.stringify(error.response.data), key: 'userLogin' });
    }
  }

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
