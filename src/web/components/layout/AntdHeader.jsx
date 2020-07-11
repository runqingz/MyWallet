import React from 'react';
import {
  PageHeader, Menu, Dropdown, Button,
} from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import '../../../App.css';

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="/">
        2nd menu item
      </a>
    </Menu.Item>
  </Menu>
);

const DropdownMenu = () => (
  <Dropdown key="more" overlay={menu}>
    <Button
      style={{
        border: 'none',
        padding: 0,
      }}
    >
      <EllipsisOutlined
        style={{
          fontSize: 20,
          verticalAlign: 'top',
        }}
      />
    </Button>
  </Dropdown>
);

function AntdHeader() {
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        title="Personal Management Tool"
        className="site-page-header-ghost-wrapper"
        subTitle="Smart in saving"
        extra={[
          <Button key="3">Sign Out</Button>,
          <DropdownMenu key="more" />,
        ]}
      />
    </div>
  );
}

export default AntdHeader;
