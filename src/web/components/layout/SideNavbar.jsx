import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

// icons taken from antd template
import {
  HomeOutlined,
  PieChartOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

function SideNavbar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = useLocation().pathname;
  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={[path]} mode="inline">
        <Menu.Item key="/">
          <HomeOutlined />
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="/dashboard">
          <PieChartOutlined />
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default SideNavbar;
