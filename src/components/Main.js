import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { UserContext } from '../contexts/UserContext';
import { Layout } from 'antd';
import Routes from './Routes';

// partial layout
import Header from './nav/Header';
import Sidebar from './nav/Sidebar';
import Footer from './nav/Footer';


const Main = () => {
  const [theme] = useContext(ThemeContext)
  const [user] = useContext(UserContext)
  const themeColor = theme && theme.color ? theme.color : 'dark'
  const isLogin = user || false

  return (
    <Layout style={{height: '100vh'}} hasSider={isLogin} className={themeColor}>
      { isLogin && <Sidebar theme={themeColor} /> }
      <Layout>
        <Header theme={themeColor} isLogin={isLogin} />
        <Layout.Content className="content-hell-yeah">
          <div className="real-content">
            <Routes isLogin={isLogin} user={(user ? user : null)} theme={themeColor} />
          </div>
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default Main;
