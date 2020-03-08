import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';

// icons taken from antd template
import {
  HomeOutlined,
  PieChartOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';

function Sider() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="Sider">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
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
    </div>
  );
}

export default Sider;
