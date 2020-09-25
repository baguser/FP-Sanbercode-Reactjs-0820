import React, { useState } from 'react';
import axios from 'axios';
import { Input, Form, Row, Col, Button, Alert } from 'antd';

const ChangePassword = (props) => {

  const [form] = Form.useForm()
  const [successMessage, setSuccessMessage] = useState([])
  const [errMessage, setErrMessage] = useState([])

  const onFinish = async (values) => {
    // do change password
    try {
      setErrMessage([])
      setSuccessMessage([])
      await axios.post('https://backendexample.sanbersy.com/api/change-password', {
        current_password: values.current_password,
        new_password: values.new_password,
        new_confirm_password: values.new_confirm_password,
      }, {
        headers: {
          'Authorization': `Bearer ${props.user.token}`
        }
      })
      setSuccessMessage(["Password changed!"])
    } catch (err) {
      console.log(err.response.data)
      let resJson = {}
      if (typeof err.response.data === 'string') {
        resJson = JSON.parse(err.response.data)
      } else {
        resJson = err.response.data
      }
      const msgs = []
      for (const key of Object.keys(resJson)) {
        msgs.push(resJson[key])
      }
      setErrMessage(msgs)
    }
    form.resetFields()
  };

  return (
    <Row justify="center" align="middle" className="h-100">
      <Col span={8} style={{
        padding: 10
      }}>
        {
          successMessage.map((v, i) => <Alert key={i} message={v} type="success" style={{marginBottom:10}} />)
        }
        {
          errMessage.map((v, i) => <Alert key={i} message={v} type="error" style={{marginBottom:10}} />)
        }
        <Form 
          name="change-password"
          layout="vertical"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="Current Password"
            name="current_password"
            rules = {
              [{
                required: true,
                message: 'Please input your current password!'
              }]
            }
            style={{marginBottom:5}}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="new_password"
            rules = {
              [{
                required: true,
                message: 'Please input a new password!'
              }]
            }
            style={{marginBottom:5}}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="new_confirm_password"
            rules = {
              [{
                required: true,
                message: 'Please input confirm a new password!'
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
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default ChangePassword;
