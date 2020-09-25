import React from 'react';
import { Layout, Menu } from 'antd';
import {LockOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
  return (
    <Layout.Sider theme={props.theme} onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
      <div className="logo" />
      <Menu theme={props.theme} mode="inline">

        <Menu.Item key="change-password" icon={<LockOutlined />}>
          <Link to="/change-password">Change Password</Link>
        </Menu.Item>
      </Menu>
    </Layout.Sider>
  );
};

export default Sidebar;
