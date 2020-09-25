import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { Input, Form, Row, Col, Button, Alert } from 'antd';

const Register = () => {

  const [errMessage, setErrMessage] = useState(null)
  const [, setUser] = useContext(UserContext)

  const onFinish = async (values) => {
    // do register
    try {
      setErrMessage(null)
      const res = await axios.post('https://backendexample.sanbersy.com/api/register', {
        name: values.name,
        email: values.email,
        password: values.password,
      })
      setUser(res.data)
    } catch (err) {
      setErrMessage("Something went wrong!")
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
        <Form 
          name="register"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          onFinish={onFinish}
        >
          <Form.Item 
            label="Name" 
            name="name"
            rules = {
              [{
                required: true,
                message: 'Please input your name!'
              }]
            }
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Email" 
            name="email"
            rules = {
              [{
                required: true,
                message: 'Please input your email!'
              }, {
                type: 'email',
                message: 'Please input an email!'
              }]
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules = {
              [{
                required: true,
                message: 'Please input your password!'
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Register;
