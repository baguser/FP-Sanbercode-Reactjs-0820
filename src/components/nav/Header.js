import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { Col, Layout, Menu, Row } from 'antd';
import {
  HomeOutlined,
  VideoCameraOutlined,
  CustomerServiceOutlined
} from '@ant-design/icons';

const Header = (props) => {
  const [, setUser] = useContext(UserContext)
  return (
    <Layout.Header className={`header ${(!props.isLogin ? '' : 'w-no-sidebar')}`} theme={props.theme}>
      <Row justify="space-between">
        <Col span={3}>
          <Menu theme={props.theme} mode="horizontal">

            {
              props.isLogin && (
                <>
                  <Menu.Item icon={<HomeOutlined />}>
                    <Link to="/">Home</Link>
                  </Menu.Item>
                  <Menu.Item icon={<VideoCameraOutlined />}>
                    <Link to="/movie-editor/list">Movies</Link>
                  </Menu.Item>
                  <Menu.Item icon={<CustomerServiceOutlined />}>
                    <Link to="/game-editor/list">Games</Link>
                  </Menu.Item>
                </>
              )
            }
          </Menu>
        </Col>
        <Col>
          <Menu theme={props.theme} mode="horizontal" defaultSelectedKeys={['4']} >
            {
              !props.isLogin ? (
                <>
                  <Menu.Item>
                    <Link to="/login">Login</Link>
                  </Menu.Item>
                  <Menu.Item>
                    <Link to="/register">Register</Link>
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item>
                  <Link to="/logout" onClick={()=>setUser(null)}>Logout</Link>
                </Menu.Item>
              )
            }
          </Menu>
        </Col>
      </Row>
    </Layout.Header>
  );
};

export default Header;
