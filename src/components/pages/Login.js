import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { Input, Form, Row, Col, Button, Alert } from 'antd';
//Home
const Login = () => {

  const [errMessage, setErrMessage] = useState(null)
  const [, setUser] = useContext(UserContext)

  const onFinish = async (values) => {
    // do login
    try {
      setErrMessage(null)
      const res = await axios.post('https://backendexample.sanbersy.com/api/user-login', {
        email: values.email,
        password: values.password,
      })
      setUser(res.data)
    } catch (err) {
      setErrMessage("Wrong Username or Password!")
    }
  };

  return (

    <Row justify="center" align="middle" className="h-100">

      <Col span={6} style={{
        padding: 10
      }}>
        {
          errMessage !== null ? <Alert message={errMessage} type="error" style={{marginBottom:10}} /> : null
        }
        <Form name="login" labelCol={{span: 8}} wrapperCol={{span: 16}} onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules = {
              [{
                required: true,
                message: 'Tolong masukan email anda'
              }, {
                type: 'email',
                message: 'Tolong masukan email anda'
              }]
            }
          >
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules = {
              [{
                required: true,
                message: 'Tolong masukan password anda'
              }]
            }
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{
            offset: 8,
            span: 16,
          }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
